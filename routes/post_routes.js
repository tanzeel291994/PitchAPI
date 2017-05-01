var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Post = require('../models/Post');

module.exports = function(app, db) {

//creates a new post
app.post('/post', (req, res) => { 
  // const post = {user_id: req.body.user_id,likes:[],dislikes:[],views:[],
   //post_txt:req.body.post_txt,created_at:new Date()};
    var post = new Post({
	  post_txt:req.body.post_txt,
      user_id: new ObjectId(req.body.user_id)
    });
	 //console.log(post);
	post.save(function (err, post) {
      if (err || ! post) return res.send(err, 500);
		return res.send(post);
    });
/*	db.collection('posts').insert(post, (err, result) => {
      if (err) { 
        res.send({'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });*/
});

//gets new ideas
app.get('/new-ideas/:page', (req, res) => {
    const page = req.params.page;
	Post.paginate({}, { page: page, limit: 2 }, function(err, result) {
		if (err) return res.send(err, 500);
		return res.send(result);
	});
});	
//like a post
app.put('/like/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    const post = { user_id: req.body.user_id };
    db.collection('posts').update(details, {$push: {likes:post.user_id}}, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send({'status':'success'});
      } 
    });
  });
//dislike a post
app.put('/dislike/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    const post = { user_id: req.body.user_id };
    db.collection('posts').update(details, {$push: {dislikes:post.user_id}}, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send({'status':'success'});
      } 
    });
  });
 //view a post
 app.put('/view/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    const post = { user_id: req.body.user_id };
    db.collection('posts').update(details, {$push: {views:post.user_id}}, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send({'status':'success'});
      } 
    });
  });
	
};