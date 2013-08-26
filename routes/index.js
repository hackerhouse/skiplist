
/*
 * GET home page.
 */

var _ = require('underscore');

function deriveTiles() {
    console.log("DERIVETILES");
}

exports.index = function(req, res){
    var users = {};
    mongo_client.connect(_mdb, function(err, db) {
	if (err) {
	    res.render(500);
	}
	var tiles_cursor = db.collection('tiles');
	var users_cursor = db.collection('users');
	tiles_cursor.find().toArray(function(err, tiles) {
	    if (err) {
		res.render(500);
	    }
	    if (tiles.length) {
		var users = {}, left=0;
		_.each(tiles, function (tile) {
		    // if this tile's user isn't in users ...
		    if (!users.hasOwnProperty(tile.uid)) {
			++left;
			// get user from db and add it to users dict
			users_cursor.findOne({'id': tile.uid}, function(err, user) {
			    if (!err) {
				users[tile.uid] = user;
			    }
			    if (users[tile.uid]) {
				tile.username = users[tile.uid].name;
			    }
			    --left || res.render('index', { title: 'SkipList', tiles: tiles });
			});
		    }
		});
	    } else {
		console.log('foo');
		res.render('index', { title: 'SkipList', tiles: tiles });
	    }
	})
    });
};
