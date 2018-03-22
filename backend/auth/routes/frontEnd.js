var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("front-end/index");
});
module.exports = router;
