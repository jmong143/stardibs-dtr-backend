var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var scheduleBookingSchema = new Schema({

  pickupLocation  : {type : String},
  dropLocation    : {type : String},
  selectedDate    : {type : String},
  selectedTime    : {type : String },
  initialPrice    : {type : String},
  distance        : {type : String},
  userObjcetId    : {type : String},
  driverObjectId  : {type : String},
  action          : {type : String},
  driverFullname  : {type : String},
  userFullname    : {type : String},
  createdAt       : {type : Date, default: Date.now},
  updatedAt       : {type : Date, default: Date.now},
  is_deleted      : {type : Boolean}

});
var scheduleBooking = mongoose.model('scheduleBooking', scheduleBookingSchema);
module.exports = scheduleBooking;
