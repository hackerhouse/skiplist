var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.read = function(req, res){
  User.find(function(err, results) {
    if (!err) {
      res.send(results);
    } else {
      res.send(500);
    }
  });
};

exports.update = function(req, res){
  console.log("Incoming Request to users.update");
  var uid = req.body.id;
  User.findOne({'id': uid}, function(err, user) {
    if(user) {
      console.log("Updating existing user: " + user.name);
      User.update({'id': uid}, req.body, function(err, modified) {
        if (!err) {
          res.send(200);
        } else {
          res.send(500);
        }
      });
    } else {
      User.create(req.body, function(err, records) {
        console.log("Creating new user");
        if (!err) {
          res.send(records);
        } else {
          res.send(500);
        }
      });
    }
  });
}
