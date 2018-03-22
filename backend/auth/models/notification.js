var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var notificationSchema = new Schema({

  subscriber_id   : {type : String},
  notifier_name   : {type : String},
  type            : {type : String},
  reference_id    : {type : String },
  reference_title : {type : String},
  text            : {type : String},
  action            : {type : String},
  createdAt       : {type : Date, default: Date.now},
  updatedAt       : {type : Date, default: Date.now},
  is_deleted      : {type : Boolean}

});
var notification = mongoose.model('notifications', notificationSchema);
module.exports = notification;
