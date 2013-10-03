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
}

exports.update = function(req, res){
  var uid = req.body.id;
  User.findOne({'id': uid}, function(err, user) {
    if(user) {
      User.update({'id': uid}, req.body, function(err, modified) {
        if (!err) {
          res.send(200);
        } else {
          res.send(500);
        }
      });
    } else {
      User.create(req.body, function(err, records) {
        if (!err) {
          res.send(records);
        } else {
          res.send(500);
        }
      });
    }
  });
}
