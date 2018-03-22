var express = require('express');
var ReservationController = require('../controllers/ReservationController');
var ReservationModel = require('../models/reservation');

var router = express.Router();
//CREATE
router.post('/', function(req, res, next) {
  var data = req.body;
  console.log("DATA FOR CREATE---> " + JSON.stringify(data))
  ReservationController.save(data, function(error, singleObject){

    var handleActionButton = "<button class = 'btn btn-danger' id = 'btnDelete' data-id = '"+ singleObject._id +"'> <span class = 'fa fa-trash-o'></span> Delete</button>    <button class = 'btn btn-primary' id = 'btnView' data-id = '"+ singleObject._id +"'> <span class = 'fa fa-info-circle'></span> View</button>";
    var currentdate = new Date();
    var getDate = currentdate.getMonth()+1 + '/' + currentdate.getDate() + '/' +currentdate.getFullYear();
    var getTime = currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();
    var formDataUpdate = {action: handleActionButton, reservationDate: getDate,reservationTimeStart:getTime};
    ReservationModel.findByIdAndUpdate(singleObject._id, { $set: formDataUpdate} ,function (err, singleObjectUpdate) {
      console.log("DATA FOR UPDATE ACTION---> " + JSON.stringify(singleObjectUpdate));
    });
    ReservationModel.find({'_id': singleObject._id}, function(err, finalData){
      res.send(JSON.stringify(finalData));
    });
  });
});

router.post('/status/complete/:reservationId', function(req, res, next) {
  var reservationId = req.params.reservationId;
    var currentdate = new Date();
    var getTime = currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();
    var formDataUpdate = {reservationStatus: "complete", reservationTimeEnd:getTime};
    ReservationModel.findByIdAndUpdate(reservationId, { $set: formDataUpdate} ,function (err, singleObjectUpdate) {
      console.log("DATA FOR UPDATE RESERVATION STATUS ACTION---> " + JSON.stringify(singleObjectUpdate));
      ReservationModel.find({'_id': singleObjectUpdate._id}, function(err, finalData){
        res.send(JSON.stringify(finalData));
      });
    });
  });


//RETRIEVE SPECIFIC DATA
router.post('/basic-search', function(req, res, next) {
  var data = req.body;
  console.log("DATA FOR THREAD SEARCH---> " + JSON.stringify(data));
  ReservationModel.find(data, function(err, result) {
      objResponse = {result: "success", data: result}
      console.log("DATA FOR SEARCH--------------> " + JSON.stringify(result))
    res.send(objResponse)
  }).sort({createdAt:-1});

});

//RETRIEVE SPECIFIC DATA WITH LIMIT
router.post('/basic-search-limit/:limitNumber', function(req, res, next) {
  var data = req.body;
  var number = Number(req.params.limitNumber);
  console.log("NUMBER=---> " + req.params.limitNumber)
  console.log("DATA FOR ReservationModel SEARCH---> " + JSON.stringify(data));
  ReservationModel.find(data, function(err, result) {
      objResponse = {result: "success", data: result}
    res.send(objResponse)
  }).limit(number).sort({createdAt:-1});

});


router.post('/book-reservation', function(req, res, next) {
  var data = req.body;
  var newReservation = new ReservationModel();
  ReservationModel.save(data, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});


//RETRIEVE ALL DATA
router.get('/', function(req, res, next) {
  ReservationController.search({}, function(error, results){
    var response = {data: results};
    res.send(JSON.stringify(response));
  });
});
//FOR VIEWING
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  ReservationController.view(id, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});
//FOR UPDATING
router.post('/:id', function(req, res, next) {
  var data = req.body;
  var id = req.params.id;
  ReservationController.update(id, data ,function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});

//FOR DELLETING
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  ReservationController.delete(id, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});

//FOR DELLETING
router.get('/count', function(req, res, next) {
  var id = req.params.id;
  ReservationController.count({}, function(error, count){
    res.send(count);
  });
});

module.exports = router;
