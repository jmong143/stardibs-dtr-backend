var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');
var NotificationModel = require('../models/notification');
var TransactionHistoryModel = require('../models/history');
var UserModel = require('../models/user');
var RateFeeModel = require('../models/rate');
var AdsModel = require('../models/ads');
var ScheduleBookingModel = require('../models/scheduleBooking');
var RateDrverModel = require('../models/rateDriver');


router.get('/dashboard', function(req, res, next) {
  res.render("admin/dashboard/index");
});

router.get('/login', function(req, res, next) {
  res.render("admin/login");
});

router.get('/reservation/index', function(req, res, next) {
  Reservation.count({}, function(err, c){
    console.log("TOTAL RESERVATION--> " + c);
    res.render("admin/reservation/index", {totalReservation: c});
  });
});

router.get('/reservation/create', function(req, res, next) {
  res.render("admin/reservation/create");
});

router.get('/notification/index', function(req, res, next) {
   NotificationModel.count({}, function(err, c){
    console.log("TOTAL NOTIFICATION--> " + c);
    res.render("admin/notification/index", {totalNotification: c});
  });
});

router.get('/transaction-history/index', function(req, res, next) {
  TransactionHistoryModel.count({}, function(err, c){
   console.log("TOTAL HISTORY--> " + c);
   res.render("admin/transaction-history/index", {totalTransHistory: c});
  });
});

router.get('/schedule-booking/index', function(req, res, next) {
  ScheduleBookingModel.count({}, function(err, c){
   console.log("TOTAL SCHEDULE BOOKING--> " + c);
   res.render("admin/schedule-booking/index", {totalSchedBooking: c});
  });
});


router.get('/user/driver', function(req, res, next) {
  UserModel.count({"userType" : "driver"}, function(err, c){
   console.log("TOTAL DRIVER--> " + c);
   res.render("admin/user/driver", {totalDriver: c});
  });
});

router.get('/user/customer', function(req, res, next) {
  UserModel.count({"userType" : "user"}, function(err, c){
   console.log("TOTAL USER--> " + c);
   res.render("admin/user/user", {totalUser: c});
  });
});

router.get('/user/', function(req, res, next) {
  res.render("admin/index");
});

router.get('/addreservation', function(req, res, next){
  res.render("admin/sample");
});

router.get('/rate-fee/index', function(req, res, next) {
  RateFeeModel.findOne({}, function(err, result){
    if(result == null){
      console.log("NULLLL ");
      res.render("admin/rate-fee/index", {rateFeeInfo: [], message: "failed"});
    }else{
      console.log("Rate Fee Result--> " + result);
      res.render("admin/rate-fee/index", {rateFeeInfo: result, message: "success"});
    }
  });


});

router.get('/driver-rating/index', function(req, res, next) {
  RateDrverModel.count({}, function(err, c){
    res.render("admin/driver-rating/index", {totalDriverRating: c});
  });
});



router.get('/ads/index', function(req, res, next) {
  AdsModel.count({}, function(err, c){
    res.render("admin/ads/index", {totalAds: c});
  });
});





























module.exports = router;
