var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TileSchema = new Schema({
  title: String,
  url: String,
  user: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
  responseHeaders: Object
});

// MongoDB has virtual timeStamps everwhere!
TileSchema.virtual('date').get(function(){
  return this._id.getTimestamp();
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
