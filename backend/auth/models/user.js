// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var userSchema = new Schema({
  //username: { type: String, required: true, unique: true },
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true },
  first_name: String,
  last_name: String,
  position: String,
  avatar: String,
  userType: String,
  hmm: String,
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now}
});


userSchema.statics.userKill = function(){
  return "USER KILL!!!";
};


// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);
// make this available to our users in our Node applications
module.exports = User;
