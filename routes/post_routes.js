var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Post = require('../models/Post');

module.exports = function(app) {

//creates a new post
app.post('/post', (req, res) => { 
    var post = new Post({
	  post_txt:req.body.post_txt,
      user_id: new ObjectId(req.body.user_id)
    });
	post.save(function (err, post) {
      if (err || ! post) return res.send(err, 500);
		return res.send(post);
    });
});

//gets new ideas
app.get('/new-ideas/:page', (req, res) => {
    const page = req.params.page;
	console.log(req.params.page);
	Post.paginate({}, { page: page, limit: 2 ,sort:{created_at:-1}}, function(err, result) {
		if (err) return res.status(500).send(err);
		return res.send(result);
	});
});	

//gets popular ideas
app.get('/popular-ideas/:page', (req, res) => {
    const page = req.params.page;
	Post.paginate({$where:'this.likes.length > this.dislikes.length'}, { page: page, limit: 2 }, function(err, result) {
		if (err) return res.status(500).send(err);
		return res.send(result);
	});
});	
//gets ignored ideas
app.get('/ignored-ideas/:page', (req, res) => {
    const page = req.params.page;
	Post.paginate({$where:'this.views.length > this.likes.length+this.dislikes.length'},{ page: page, limit: 2 }, function(err, result) {
		if (err) return res.status(500).send(err);
		return res.send(result);
	});
});	
//like a post
app.put('/like/:id', (req, res) => {
    const id = req.params.id;
    const query = { '_id': new ObjectId(id) };
    const post = { user_id: req.body.user_id };
    Post.update(query, { $push: { likes: post.user_id }},{},function(err)
	{
		if (err) return res.send(err, 500);
		return res.send({'status':200});	
	});
  });
//dislike a post
app.put('/dislike/:id', (req, res) => {
    const id = req.params.id;
    const query = { '_id': new ObjectId(id) };
    const post = { user_id: req.body.user_id };
    Post.update(query, { $push: { dislikes: post.user_id }},{},function(err)
	{
		if (err) return res.send(err, 500);
		return res.send({'status':200});	
	});
  });
 //view a post
app.put('/view/:id', (req, res) => {
    const id = req.params.id;
    const query = { '_id': new ObjectId(id) };
    const post = { user_id: req.body.user_id };
    Post.update(query, { $push: { views: post.user_id }},{},function(err)
	{
		if (err) return res.send(err, 500);
		return res.send({'status':200});	
	});
  });	
};