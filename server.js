const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser'); //handle JSON requests
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({
		extended: true
	}));
const db = require('./config/db');
var mongoose = require('mongoose');

//var db1=mongoose.connect(db.url);
//require('./routes')(app, db1);

mongoose.connect(db.url, {
	server: {
		socketOptions: {
			socketTimeoutMS: 0,
			connectTimeoutMS: 0
		}
	}
}, function (error) {

	if (error) {
		console.log(error);
	} else {
		require('./routes')(app);
	}

});
app.get('/new-ideas/:page', (req, res) => {
    const page = req.params.page;
	console.log(req.params.page);
	Post.paginate({}, { page: page, limit: 2 ,sort:{created_at:-1}}, function(err, result) {
		if (err) return res.status(500).send(err);
		return res.send(result);
	});
});	
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});