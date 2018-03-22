var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var rateSchema = new Schema({

  taxiRate        : {type : String},
  totalDistance   : {type : String},
  ratePerDistance : {type : String},
  waitingTime     : {type : String },
  ratePerWaiting  : {type : String},
  createdAt       : {type : Date, default: Date.now},
  updatedAt       : {type : Date, default: Date.now},
  is_deleted      : {type : Boolean}

});
var rate = mongoose.model('rateFee', rateSchema);
module.exports = rate;
