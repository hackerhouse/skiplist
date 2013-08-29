var mongoose = require('mongoose')
  , Tile = mongoose.model('tiles');

exports.read = function(req, res){
  Tile.find(function(err, results) {
    if (!err) {
      res.send(results);
    } else {
      res.send(500);
    }
  });
}

exports.update = function(req, res){
    var tileq = {'uid': req.body.uid,
		 'pageURL': req.body.pageURL
		};
    Tile.findOne(tileq, function(err, tile) {
	if (!err) {
            if (tile) {
		Tile.update(tileq, req.body, function(err, modified) {
		    res.send(modified);
		});
            } else {
		Tile.create(req.body, function(err, records) {
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
}

