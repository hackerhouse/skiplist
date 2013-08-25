
/*
 * GET users listing.
 */

exports.update = function(req, res){
    mongo_client.connect(_mdb, function(err, db) {
	var uid = req.body.id;
	var collection = db.collection('users');
	collection.findOne({'id': uid}, function(err, user) {
	    if(user) {
		collection.update({'id': uid}, req.body, function(err, modified) {
		    if (!err) {
			res.send(200);
		    } else {
			res.send(500);
		    }
		});
	    } else {
		collection.insert(req.body, function(err, records) {
		    if (!err) {
			res.send(records);
		    } else {
			res.send(500);
		    }
		});
	    }
	});
    });
}

exports.read = function(req, res){
    mongo_client.connect(_mdb, function(err, db) {
	var collection = db.collection('users');
	collection.find().toArray(function(err, results) {
	    if (!err) {
		res.send(results);
	    } else {
		res.send(500);
	    }
	});
    });
}