var express = require('express');

module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.use(express.favicon(config.root + '/app/views/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    // Hogan.js setup
    // hjs files use .html as their extension now.
    app.set('view engine', 'html');
    app.set('layout', 'layout');
    app.engine('html', require('hogan-express'));
    // In production we don't care about refreshing the templates.
    if ('development' != app.get('env')) { app.enable('view cache'); }

    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};
