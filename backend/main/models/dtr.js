// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var reservationSchema = new Schema({
  userId: { type: String},
  timeIn: { type: String , default: '--'},
  dateIn: { type: String, default: '--'},
  timeOut: { type: String, default: '--'},
  dateOut: { type: String, default: '--'},
  totalHours: { type: String, default: '--'},
  status: { type: String},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

var Reservation = mongoose.model('timeRecord', reservationSchema);
module.exports = Reservation;
