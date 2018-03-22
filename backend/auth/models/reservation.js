// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var reservationSchema = new Schema({
  pickUpLocation: { type: String},
  destination: { type: String},
  distance: { type: String},
  price: { type: String},
  reservationStatus: { type: String},
  is_cancel: { type: String},
  reservationDate: { type: String},
  userObjectId: { type: String},
  reservationTimeEnd: { type: String},
  reservationTimeStart: { type: String},
  driverObjectId: { type: String},
  driverPlateNumber: { type: String},
  action: { type: String},
  driverFullname: { type: String, default: "--"},
  userFullname: { type: String, default: "--"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

var Reservation = mongoose.model('reservations', reservationSchema);
module.exports = Reservation;
