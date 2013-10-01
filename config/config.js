var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'skiplist'
    },
    port: 4000,
    db: 'mongodb://localhost/linkshare'
  },

  test: {
    root: rootPath,
    app: {
      name: 'skiplist'
    },
    port: 4000,
    db: 'mongodb://localhost/skiplist-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'skiplist'
    },
    port: 4000,
    db: 'mongodb://localhost/skiplist-production'
  }
};

module.exports = config[env];
