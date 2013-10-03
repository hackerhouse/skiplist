module.exports = function(app){
  // Homepage
  var home = require('../app/controllers/home');
  app.get('/', home.index);

  // Users
  var user = require('../app/controllers/user');
  app.get('/users', user.read);
  app.post('/users', user.update);

  // Tiles
  var tile = require('../app/controllers/tile');
  app.get('/tiles', tile.read);
  app.del('/tiles/:id', tile.del);
  app.post('/tiles', tile.update);

  var logger = require('../app/controllers/logger');
  app.post('/log', logger.update);
};
