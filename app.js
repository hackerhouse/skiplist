
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , User = require('./model/users')
  , Tile = require('./model/tiles')
  , routes = require('./routes')
  , user = require('./routes/user')
  , tile = require('./routes/tile')
  , http = require('http')
  , path = require('path');

var app = express();

/* Vars accessible to all subapps */
format = require('util').format;
_ = require('underscore');

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    // consider: process.env.WERCKER_MONGODB_HOST
    mongoose.connect('mongodb://127.0.0.1:27017/linkshare_test');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    mongoose.connect('mongodb://127.0.0.1:27017/linkshare');
    app.use(express.errorHandler());
});


//app.get('/', routes.index);
app.get('/users', user.read);
app.get('/tiles', tile.read);

app.post('/users', user.update);
app.post('/tiles', tile.update);

//app.del('/tiles/:id', tile.del);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require("socket.io").listen(server);
io.on('connection', function(socket){
	console.log("Connection Establisted!");
	socket.emit ('event_from_server', { message : 'This is a LIVE connection!'})
});
