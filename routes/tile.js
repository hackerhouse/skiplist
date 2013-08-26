
/*
 * POST tile listing.
 */

exports.update = function(req, res){
  mongo_client.connect(_mdb, function(err, db) {
    var tileq = {'uid': req.body.uid,
      'pageURL': req.body.pageURL
    };
    var collection = db.collection('tiles');	
    collection.findOne(tileq, function(err, tile) {
      if (!err) {
        if (tile) {
          collection.update(tileq, req.body, function(err, modified) {
            res.send(modified);
          });
        } else {
          collection.insert(req.body, function(err, records) {
            res.send(records);
          });
        }
      } else {
        res.send(500);
      }
    });
  });
};

exports.del = function (req, res) {
    var tid = new BSON.ObjectID(req.params.id);
    mongo_client.connect(_mdb, function(err, db) {
	if (err) {
	    res.send(500)
	}
	var collection = db.collection('tiles');
	collection.remove({_id: tid}, function(err, removed) {
	    if (err) {
		console.log(err);
		res.send(500);
	    } else {
		console.log(removed);
		res.send(200);
	    }
	});

    });
}

exports.read = function(req, res){
  mongo_client.connect(_mdb, function(err, db) {
    var collection = db.collection('tiles');
    collection.find().toArray(function(err, results) {
      if (!err) {
        res.send(results);
      } else {
        res.send(500);
      }
    });
  });
}
