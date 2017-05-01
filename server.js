const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser'); //handle JSON requests
const app            = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
const db = require('./config/db');
var mongoose = require('mongoose');

//var db1=mongoose.connect(db.url);
//require('./routes')(app, db1); 

mongoose.connect(db.url, {server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectTimeoutMS: 0
    }
}}, function (error) {
    
	if (error) {
        console.log(error);
    }
	else
	{
		require('./routes')(app,null);
	   app.listen(port, () => {
       console.log('We are live on ' + port);
  });
	}
		
});
/*
MongoClient.connect(db.url, (err, db) => {
 //  uri_decode_auth: true ;
  if (err) return console.log(err)
  require('./routes')(app, db); 
	app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
*/
