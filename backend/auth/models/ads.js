var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var notificationSchema = new Schema({

  adsName       : {type : String},
  adsAddress    : {type : String},
  adsContact    : {type : String},
  adsEmail      : {type : String },
  adsDescription: {type : String},
  adsLat        : {type : String},
  adsLong       : {type : String},
  action        : {type : String},
  createdAt     : {type : Date, default: Date.now},
  updatedAt     : {type : Date, default: Date.now},
  is_deleted    : {type : Boolean}

});
var notification = mongoose.model('ads', notificationSchema);
module.exports = notification;
