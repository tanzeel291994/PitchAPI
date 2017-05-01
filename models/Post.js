var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var postSchema = mongoose.Schema({
  post_txt: String,
  likes:[mongoose.Schema.Types.ObjectId],
  dislikes:[mongoose.Schema.Types.ObjectId],
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true
  },
  views: [mongoose.Schema.Types.ObjectId],
  created_at: {
    type: Date,
    default: Date.now
  }
});
postSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Post', postSchema);
