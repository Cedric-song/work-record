var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// Define User schema
var _User = new Schema({
  name: String,
  email: String,
  password: String
});

_User.plugin(passportLocalMongoose)
// export them
exports.User = mongoose.model('User', _User);
