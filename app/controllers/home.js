var mongoose = require('mongoose'),
User = mongoose.model('User'),
Tile = mongoose.model('Tile');

var _ = require('underscore');

exports.index = function(req, res) {
  Tile.find(null, null, {sort: {$natural: -1}}, function(err, tiles) {
    if (err) {
      res.render('500');
    }
    var users = {};
    _.forEach(tiles, function(tile) {
      // If this is an image, designate it in a temporary var, we have to set
      // both to accommodate it's logic-less nature (or register a macro)
      if (tile.url.match(/(?:png|jpeg|jpg|gif)$/)) {
        tile.isImage = true;
      } else {
        tile.isTile = true;
        var protocolEnd = tile.url.indexOf("//") + 2;
        tile.text_url = tile.url.slice(protocolEnd, 22 + protocolEnd);
      }
    });
    res.locals = {title: 'Skiplist', tiles: tiles};
    res.render('index');
  });
};
