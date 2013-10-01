module.exports = function(app){
  var home = require('../app/controllers/home');
  app.get('/', home.index);
};
