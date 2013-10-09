var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TileSchema = new Schema({
  title: String,
  url: String,
  user: Object,
  upvotes: { type: Number, 'default': 1}
  // user: {
  //   name: String,
  //   id: Schema.Types.ObjectID
  // }
});

// MongoDB has virtual timeStamps everwhere!
// (This is to say that we don't need to collect timestamps, they are embedded
// in the object itself, unlike other database systems)
TileSchema.virtual('date').get(function(){
  var date = this._id.getTimestamp();
  return "" + date;
});

// Short URL for the purposes of displaying the URL in the frontend.
TileSchema.virtual('shortUrl').get(function(){
  var protocolEnd = this.url.indexOf("//") + 2;
  return this.url.slice(protocolEnd, 21 + protocolEnd);
});


// Very, very long RegExp (only incidentally a function) that came into use in
// home.js. I will keep it around for now but I would very much like to obsolete it
// through the transmission of hostname by the extension as soon as reasonable.
TileSchema.methods.parseURL = function (str) {
  function parseUri (str) {
    var  o   = parseUri.options,
      m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
      uri = {},
      i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
  }

  parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo",
          "user", "password", "host", "port", "relative",
          "path", "directory", "file", "query", "anchor"],
    q:   {
      name:   "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    // This is why people use Coffeescript.
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };

  return parseUri(this.url);
};

mongoose.model('Tile', TileSchema);
