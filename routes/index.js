(function() {

  var mongoose = require('mongoose')
    , User = mongoose.model('users')
    , Tile = mongoose.model('tiles')

  var _ = require('underscore');

  function trimName (name) {
    return name.split(' ')[0];
  };

  function parseUri (str) {
    var o   = parseUri.options,
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
  };

  parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
      name:   "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };

  function trimDomain (domain) {
    return parseUri(domain).host;
  }

  exports.index = function(req, res){
      Tile.find().toArray(function(err, tiles) {
          if (err) {
              res.render(500);
          }
          if (tiles.length) {
              var users = {}, left=0;
              _.each(tiles, function (tile) {
		  // if this tile's user isn't in users ...            
		  tile.prettyURL = trimDomain(tile.pageURL);            
		  console.log(tile);

		  if (!users.hasOwnProperty(tile.uid)) {
		      ++left;
		      // get user from db and add it to users dict
		      User.findOne({'id': tile.uid}, function(err, user) {
			  if (!err) {
			      users[tile.uid] = user;
			  }
			  if (users[tile.uid]) {
			      tile.username = trimName(users[tile.uid].name);
			  }
			  --left || res.render('index', { title: 'SkipList',
							  tiles: tiles });
		      });
		  }
              });
          } else {
              res.render('index', { title: 'SkipList', tiles: tiles });
          }
      });
  };
})();
