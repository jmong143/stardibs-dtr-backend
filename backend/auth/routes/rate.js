var express = require('express');
var RateController = require('../controllers/RateController');
var RateModel = require('../models/rate');

var router = express.Router();
//CREATE
router.post('/', function(req, res, next) {
  var data = req.body;
  // console.log("DATA FOR CREATE---> " + JSON.stringify(data))
  RateModel.find({}, function(err, result) {
    console.log("DATA IF RATE EXISTS===> " + JSON.stringify(result))
    if(result.length > 0 ){
      console.log("RATE FEE MUST UPDATE-> " + result[0]._id);
      RateModel.findByIdAndUpdate(result[0]._id, { $set: data} ,function (err, singleObjectUpdate) {
        console.log("DATA FOR UPDATE ACTION---> " + JSON.stringify(singleObjectUpdate));
        var response = {data: singleObjectUpdate};
        res.send(JSON.stringify(response));
      });
    }else{
      console.log("RATE FEE MUST CREATE");
      RateController.save(data, function(error, singleObject){
        var response = {data: singleObject};
        res.send(JSON.stringify(response));
      });
    }
  });
});


//RETRIEVE SPECIFIC DATA
router.post('/basic-search', function(req, res, next) {
  var data = req.body;
  console.log("DATA FOR THREAD SEARCH---> " + JSON.stringify(data));
  RateModel.find(data, function(err, result) {
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
  console.log("DATA FOR RateModel SEARCH---> " + JSON.stringify(data));
  RateModel.find(data, function(err, result) {
      objResponse = {result: "success", data: result}
    res.send(objResponse)
  }).limit(number).sort({createdAt:-1});

});


router.post('/book-reservation', function(req, res, next) {
  var data = req.body;
  var newReservation = new RateModel();
  RateModel.save(data, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});


//RETRIEVE ALL DATA
router.get('/', function(req, res, next) {
  RateController.search({}, function(error, results){
    var response = {data: results};
    res.send(JSON.stringify(response));
  });
});
//FOR VIEWING
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  RateController.view(id, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});
//FOR UPDATING
router.post('/:id', function(req, res, next) {
  var data = req.body;
  var id = req.params.id;
  RateController.update(id, data ,function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});

//FOR DELLETING
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  RateController.delete(id, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});

//FOR DELLETING
router.get('/count', function(req, res, next) {
  var id = req.params.id;
  RateController.count({}, function(error, count){
    res.send(count);
  });
});

module.exports = router;
