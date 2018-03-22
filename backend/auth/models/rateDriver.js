var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var rateDriverSchema = new Schema({

  driverObjectID  : {type : String},
  rating          : {type : String},
  comment         : {type : String},
  userType        : {type : String },
  action          : {type : String},
  createdAt       : {type : Date, default: Date.now},
  updatedAt       : {type : Date, default: Date.now},
  is_deleted      : {type : Boolean}

});
var rateDriver = mongoose.model('rateDriver', rateDriverSchema);
module.exports = rateDriver;
