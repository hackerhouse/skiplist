var mongoose = require('mongoose'),
User = mongoose.model('User'),
Tile = mongoose.model('Tile');

var _ = require('underscore');

exports.index = function(req, res) {
  Tile.find(function(err, tiles) {
    if (err) {
      res.render('500');
    }
    var users = {};
    res.locals = {title: 'Skiplist', tiles: tiles};
    res.render('index');
  });
};
