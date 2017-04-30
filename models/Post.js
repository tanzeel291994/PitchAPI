var mongoose = require('mongoose')
var postSchema = mongoose.Schema({
  post_text: String,
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true
  },
  views: {
    type: Number,
    default: 0
  },
	created_at: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Post', postSchema)
