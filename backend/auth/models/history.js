// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var transactionHistorySchema = new Schema({
  currectObjectId: { type: String},
  fullname: { type: String},
  transactionId: { type: String},
  transactionDate: { type: String},
  transactionTimeStart: { type: String},
  transactionTimeEnd: { type: String},
  price: { type: String},
  driverPlateNumber: { type: String},
  reservationStatus: { type: String},
  action: { type: String},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

var TransactionHistory = mongoose.model('transactionHistory', transactionHistorySchema);
module.exports = TransactionHistory;
