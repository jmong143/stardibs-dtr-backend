var express = require('express');
var TransactionHistoryController = require('../controllers/TransactionHistoryController');
var TransactionHistoryModel = require('../models/history');

var router = express.Router();
//CREATE
router.post('/', function(req, res, next) {
  var data = req.body;
  console.log("DATA FOR CREATE---> " + JSON.stringify(data))
  TransactionHistoryController.save(data, function(error, singleObject){
    var response = {data: singleObject};
    var handleActionButton = "<button class = 'btn btn-danger' id = 'btnDelete' data-id = '"+ singleObject._id +"'> <span class = 'fa fa-trash-o'></span> Delete</button>    <button class = 'btn btn-primary' id = 'btnView' data-id = '"+ singleObject._id +"'> <span class = 'fa fa-info-circle'></span> View</button>";
    var formDataUpdate = {action: handleActionButton};
        TransactionHistoryModel.findByIdAndUpdate(singleObject._id, { $set: formDataUpdate} ,function (err, singleObjectUpdate) {
          console.log("DATA FOR UPDATE ACTION---> " + JSON.stringify(singleObjectUpdate));
        });
    res.send(JSON.stringify(response));
  });
});


//RETRIEVE DATA BY CURRENT OBJECT ID
router.get('/current/:currectObjectId', function(req, res, next) {
  var currectObjectId = req.params.currectObjectId;
  TransactionHistoryModel.find({currectObjectId: currectObjectId}, function(err, result) {
    console.log("DATA FOR SEARCH TRANS HISTORY BY current objectId--------------> " + JSON.stringify(result))
    if(result.length > 0 ){
      objResponse = {result: "success", resultMessage: "Successfully Retrieve Transaction History", data: result}
      res.send(objResponse)
    }
    else{
      objResponse = {result: "failed", resultMessage: "Failed to Retrieve Transaction History", data: result}
      res.send(objResponse)
      }
  }).sort({createdAt:-1});
});

//RETRIEVE DATA BY TRANSACTION/RESERVATION ID
router.get('/get-all/:currectObjectId', function(req, res, next) {
  var currectObjectId = req.params.currectObjectId;
  TransactionHistoryModel.find({currectObjectId: currectObjectId}, function(err, result) {
    console.log("DATA FOR SEARCH TRANS HISTORY BY current objectId--------------> " + JSON.stringify(result))
    if(result.length > 0 ){
      objResponse = {result: "success", resultMessage: "Successfully Retrieve Transaction History", data: result}
      res.send(objResponse)
    }
    else{
      objResponse = {result: "failed", resultMessage: "Failed to Retrieve Transaction History", data: result}
      res.send(objResponse)
      }
  }).sort({createdAt:-1});
});

//RETRIEVE SPECIFIC DATA
router.post('/basic-search', function(req, res, next) {
  var data = req.body;
  console.log("DATA FOR THREAD SEARCH---> " + JSON.stringify(data));
  TransactionHistoryModel.find(data, function(err, result) {
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
  console.log("DATA FOR TransactionHistoryModel SEARCH---> " + JSON.stringify(data));
  TransactionHistoryModel.find(data, function(err, result) {
      objResponse = {result: "success", data: result}
    res.send(objResponse)
  }).limit(number).sort({createdAt:-1});
});


router.post('/book-reservation', function(req, res, next) {
  var data = req.body;
  var newReservation = new TransactionHistoryModel();
  TransactionHistoryModel.save(data, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});


//RETRIEVE ALL DATA
router.get('/', function(req, res, next) {
  TransactionHistoryController.search({}, function(error, results){
    var response = {data: results};
    res.send(JSON.stringify(response));
  });
});
//FOR VIEWING
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  TransactionHistoryController.view(id, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});
//FOR UPDATING
router.post('/:id', function(req, res, next) {
  var data = req.body;
  var id = req.params.id;
  TransactionHistoryController.update(id, data ,function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});

//FOR DELLETING
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  TransactionHistoryController.delete(id, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});

//FOR DELLETING
router.get('/count', function(req, res, next) {
  var id = req.params.id;
  TransactionHistoryController.count({}, function(error, count){
    res.send(count);
  });
});

module.exports = router;
