var ObjectId = require('mongodb').ObjectID;
var User = require('../models/User');

module.exports = function(app) {

//finds user through email id	
app.post('/sign_in', (req, res) => { 
   const query = {user_email: req.body.user_email};
   User.findOne(query, {}, function (err, person) {
    if (err) return handleError(err);
    else if(person==null) res.send({'status':'not-exists'});
    else res.send(person);
  });
});
//creates a new user
app.post('/sign_up', (req, res) => { 
    var user = new User({
	  user_email:req.body.user_email,
      user_name: req.body.user_name
    });
	user.save(function (err, user) {
      if (err || ! user) return res.send(err, 500);
		return res.send(user);
    });
});
};