var mongoose = require('mongoose'),
Tile = mongoose.model('Tile');

exports.read = function(req, res){
  Tile.find(function(err, results) {
    if (!err) {
      res.send(results);
    } else {
      res.send(500);
    }
  });
};

exports.update = function(req, res){
  var tileq = {'url': req.body.url };
    Tile.findOne(tileq, function(err, tile) {
      if (!err) {
        if (tile) {
          tile.upvotes += 1;
          Tile.update(tileq, tile, function(err, modified) {
            res.send(modified);
          });
        } else {
          // it's sunday and I'll going full lazymode (I still have work I need
          // to finish). Don't bother using `populate` to derive a preexisting user,
          // just read in our user's oauth info from the request.
          var newTile  = req.body;
          newTile.user = req.body.user.oauth_id;
          Tile.create(newTile, function(err, records) {
            io.sockets.emit('tile_added', records);
            res.send(records);
          });
        }
      } else {
        res.send(500);
      }
    });
};

exports.del = function (req, res) {
  var tid = new mongoose.Types.ObjectId(req.params.id);
  Tile.remove({_id: tid}, function(err, removed) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      console.log(removed);
      res.send(200);
    }
  });
};
