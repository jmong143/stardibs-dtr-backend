var express = require('express');
var UserController = require('../controllers/UserController');
var router = express.Router();
var UsersModel = require('../models/user');
//CREATE
router.post('/', function(req, res, next) {
  var data = req.body;
  UserController.save(data, function(error, singleObject){
    res.send(JSON.stringify(singleObject));
  });
});
//RETRIEVE ALL DATA
router.get('/', function(req, res, next) {
  UserController.search({}, function(error, results){
    var response = {data: results};
    res.send(response);
  });
});


//RETRIEVE SPECIFIC DATA
router.post('/basic-search', function(req, res, next) {
  var data = req.body;
  console.log("DATA FOR THREAD SEARCH---> " + JSON.stringify(data));
  UsersModel.find(data, function(err, result) {
      objResponse = {result: "success", data: result}
      console.log("DATA FOR SEARCH--------------> " + JSON.stringify(result))
    res.send(objResponse)
  }).sort({createdAt: -1});

});


//RETRIEVE SPECIFIC DATA WITH LIMIT
router.post('/basic-search-limit/:limitNumber', function(req, res, next) {
  var data = req.body;
  var number = Number(req.params.limitNumber);
  console.log("NUMBER=---> " + req.params.limitNumber)
  console.log("DATA FOR THREAD SEARCH---> " + JSON.stringify(data));
  UsersModel.find(data, function(err, result) {
      objResponse = {result: "success", data: result}
    res.send(objResponse)

  }).limit(number).sort({createdAt :-1});
});
//FOR VIEWING
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  UserController.view(id, function(error, singleObject){
    res.send(JSON.stringify(singleObject));
  });
});
//FOR UPDATING
router.post('/:id', function(req, res, next) {
  var data = req.body;
  var id = req.params.id;
  UserController.update(id, data ,function(error, singleObject){
    res.send(JSON.stringify(singleObject));
  });
});

//FOR DELLETING
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  UserController.delete(id, function(error, singleObject){
    res.send(JSON.stringify(singleObject));
  });
});

//FOR DELLETING
router.get('/count', function(req, res, next) {
  var id = req.params.id;
  UserController.count({}, function(error, count){
    res.send(count);
  });
});

module.exports = router;
