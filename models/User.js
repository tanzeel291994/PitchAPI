var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  user_name: String,
  user_email: String
})

module.exports = mongoose.model('User', userSchema)

