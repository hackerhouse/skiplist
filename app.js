
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var tile = require('./routes/tile');
var http = require('http');
var path = require('path');
var _ = require('underscore');

var app = express();

/* Vars accessible to all subapps */
mongo_client = require('mongodb').MongoClient;
format = require('util').format;
_mdb = 'mongodb://127.0.0.1:27017/linkshare';
_ = require('underscore');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/users', user.read);
app.post('/users', user.update);

app.get('/tiles', tile.read);
app.post('/tiles', tile.update);

//app.get('/', function(req, res) { res.render('index', {'title': 'foo', 'tiles': {}})});

/*
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require("socket.io").listen(server);
io.on('connection', function(socket){
	console.log("Connection Establisted!");
	socket.emit ('event_from_server', { message : 'This is a LIVE Connection mofos!'})
	function derp() {
		console.log("doing stuff");
		socket.emit ('ping', { message : 'PING PING PING'})
		setTimeout(function(){derp();}, 1000);
	};
	derp();
});
*/