var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/date', function(req, res, next) {
  var serverDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Singapore' });
  res.send({"server_date": serverDate});
  // var datetime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' });
});
router.get('/time', function(req, res, next){
  var serverTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Singapore' });
  res.send({"server_time": serverTime});
});

module.exports = router;
