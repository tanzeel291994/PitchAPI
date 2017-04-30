var ObjectId = require('mongodb').ObjectID;
var User = require('../models/User');

module.exports = function(app, db) {

//finds user through email id	
app.post('/sign_in', (req, res) => { 
   const user = {user_email: req.body.user_email};
    db.collection('users').findOne({user_email:req.body.user_email}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
		  console.log(item);
		 if(item!=null)
			  res.send(item); //
		 else{
			res.send({'status':'not-exists'});
		}
      }
    });
});
//creates a new user
app.post('/sign_up', (req, res) => { 
   const user = {user_email: req.body.user_email,user_name:req.body.user_name};
    db.collection('users').insert(user, (err, result) => {
      if (err) { 
        res.send({'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
});
	
	/*User.findOne({ 'user_email': user.user_email }, function (err, docs) {
		if(!docs)
			 res.send(result.ops[0]);
		 else
		 {
			 var userObj = new User(user);
			userObj.save(function (err, createdTodoObject) {  
			if (err) {
				res.send(err);
			}
			// This createdTodoObject is the same one we saved, but after Mongo
			// added its additional properties like _id.
			res.send(createdTodoObject);
          });
		 }
     });
	*/
 

  
};