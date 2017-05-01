var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  user_email: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)

