var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('./config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app  = express();
var path = require('path');
var http = require('http');
// Accessible to subapps
format = require('util').format;
_      = require('underscore');

require('./config/express')(app, config);
require('./config/routes')(app);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Setup our HTTP server
var server = http.createServer(app);
server.listen(config.port, function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Listen for SocketIO connections
io = require("socket.io").listen(server);
io.on('connection', function(socket){
  console.log("Connection Establisted!");
  socket.emit('connection_established', {
    message : 'Connection Establisted!'
  });
});

