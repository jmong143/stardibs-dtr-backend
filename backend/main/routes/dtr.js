var express = require('express');
var DTRController = require('../controllers/DTRController');
var DTRModel = require('../models/dtr');

var moment = require('moment');

var router = express.Router();
//CREATE
router.post('/', function(req, res, next) {
  var data = req.body;
  var formCheckTimeIn = {status: 'IN', userId: req.body.userId};
  DTRModel.findOne(formCheckTimeIn, function(err, result) {
    console.log("CHECK TIME IN--> " + JSON.stringify(result))
    if(result == null){
      //MUST SAVE
      console.log("DATA MUST SAVE");
      DTRController.save(data, function(error, singleObject){
        res.send({message: "success", resultMessage: 'Successfully Time In', data: singleObject});
      });
    }else{
      res.send({message: "failed", resultMessage: 'Failed to Time In'});
      console.log("CURRENT TIME IN");
    }
  });

});

router.post('/out', function(req, res, next) {
  var data = req.body;
  var searchCurrentTimeIn = {status: "IN", userId: req.body.userId}
  DTRModel.findOne(searchCurrentTimeIn, function(err, result) {
      console.log("DATA FOR SEARCH CURRENT TIME IN--------------> " + JSON.stringify(result))
      if(result == null){
        console.log("NULLLLLLL");
        res.send({message: "failed", resultMessage: "Not Time in yet"})
      }else{
        console.log("HEREEEEE")
        var currentTimeInId = result._id;
        var currentTimeIn = result.timeIn;
        var currentDate = moment().format('LL');

        var startTime=moment(currentTimeIn, "HH:mm:ss a");
        var endTime=moment(req.body.timeOut, "HH:mm:ss a");
        var duration = moment.duration(endTime.diff(startTime));
        var hours = parseInt(duration.asHours());
        var minutes = parseInt(duration.asMinutes())-hours*60;


        var totalHours = hours + ' hour and '+ minutes+' minutes.';

        var updateTimeOutForm = {totalHours: totalHours, status: 'OUT', timeOut: req.body.timeOut, dateOut: req.body.dateOut}
        DTRModel.findByIdAndUpdate(currentTimeInId, { $set: updateTimeOutForm} ,function (err, updateTimeOut) {
          console.log("UPDATED DATA FOR TIME OUT--> " + JSON.stringify(updateTimeOut));
          DTRModel.findOne({_id: updateTimeOut._id}, function(err, newResult) {
            res.send({message: "success", resultMessage: "Successfully Time Out!", data: newResult})
          });
        });
        //UPDATE HERE
      }
  }).limit(1).sort({createdAt:-1});


  // DTRModel.save(data, function(error, singleObject){
  //   res.send(JSON.stringify(singleObject));
  // });
});



router.post('/manual-time-out/:id', function(req, res, next) {
  var currentTimeInId = req.params.id;
  var startTime=moment(req.body.timeIn, "HH:mm:ss a");
  var endTime=moment(req.body.timeOut, "HH:mm:ss a");
  var duration = moment.duration(endTime.diff(startTime));
  var hours = parseInt(duration.asHours());
  var minutes = parseInt(duration.asMinutes())-hours*60;


  var totalHours = hours + ' hour and '+ minutes+' minutes.';

  var updateManualTimeOutForm = {totalHours: totalHours, status: 'OUT', timeOut: req.body.timeOut, dateOut: req.body.dateOut}
  DTRModel.findByIdAndUpdate(currentTimeInId, { $set: updateManualTimeOutForm} ,function (err, updateTimeOut) {
    console.log("UPDATED DATA FOR MANUAL TIME OUT--> " + JSON.stringify(updateTimeOut));
    DTRModel.findOne({_id: updateTimeOut._id}, function(err, newResult) {
      res.send({message: "success", resultMessage: "Successfully Time Out via Manual Proccess!", data: newResult})
    });
  });


});



router.post('/manual-time-in', function(req, res, next) {
  var startTime=moment(req.body.timeIn, "HH:mm:ss a");
  var endTime=moment(req.body.timeOut, "HH:mm:ss a");
  var duration = moment.duration(endTime.diff(startTime));
  var hours = parseInt(duration.asHours());
  var minutes = parseInt(duration.asMinutes())-hours*60;


  var totalHours = hours + ' hour and '+ minutes+' minutes.';

  DTRModel.findOne({dateIn: req.body.dateIn}, function(err, result) {
    console.log("RESULT--> " + JSON.stringify(result))
    if(result == null){
      console.log("NULL MUST CREATE RECORD");
      var dtrModel = new DTRModel();
      dtrModel.userId = req.body.userId;
      dtrModel.status = req.body.status;
      dtrModel.totalHours = totalHours;
      dtrModel.dateOut = req.body.dateOut;
      dtrModel.dateIn = req.body.dateIn;
      dtrModel.timeIn = req.body.timeIn;
      dtrModel.timeOut = req.body.timeOut;
      dtrModel.save(function(err) {
        res.send({message: "success", resultMessage: "Successfully added", data: dtrModel})
      });
    }else{
      res.send({message: "failed", resultMessage: "Unable to create, Date Record Exists"})
      console.log("HAS DATA UNABLE TO CREATE")
    }
  });





  // var updateManualTimeOutForm = {totalHours: totalHours, status: 'OUT', timeOut: req.body.timeOut, dateOut: req.body.dateOut}
  // DTRModel.findByIdAndUpdate(currentTimeInId, { $set: updateManualTimeOutForm} ,function (err, updateTimeOut) {
  //   console.log("UPDATED DATA FOR MANUAL TIME OUT--> " + JSON.stringify(updateTimeOut));
  //   DTRModel.findOne({_id: updateTimeOut._id}, function(err, newResult) {
  //     res.send({message: "success", resultMessage: "Successfully Time Out via Manual Proccess!", data: newResult})
  //   });
  // });


});


//RETRIEVE SPECIFIC DATA
router.post('/basic-search', function(req, res, next) {
  var data = req.body;
  console.log("DATA FOR THREAD SEARCH---> " + JSON.stringify(data));
  DTRModel.find(data, function(err, result) {
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
  console.log("DATA FOR DTRModel SEARCH---> " + JSON.stringify(data));
  DTRModel.find(data, function(err, result) {
      objResponse = {result: "success", data: result}
    res.send(objResponse)
  }).limit(number).sort({createdAt:-1});

});


router.post('/book-reservation', function(req, res, next) {
  var data = req.body;
  var newReservation = new DTRModel();
  DTRModel.save(data, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});


//RETRIEVE ALL DATA
router.get('/', function(req, res, next) {
  DTRController.search({}, function(error, results){
    var response = {data: results};
    res.send(JSON.stringify(response));
  });
});
//FOR VIEWING
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  DTRController.view(id, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});
//FOR UPDATING
router.post('/:id', function(req, res, next) {
  var data = req.body;
  var id = req.params.id;
  DTRController.update(id, data ,function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});

//FOR DELLETING
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  DTRController.delete(id, function(error, singleObject){
    var response = {data: singleObject};
    res.send(JSON.stringify(response));
  });
});

//FOR DELLETING
router.get('/count', function(req, res, next) {
  var id = req.params.id;
  DTRController.count({}, function(error, count){
    res.send(count);
  });
});

module.exports = router;
