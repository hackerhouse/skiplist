// grunt
var request = require('request');
// shelljs shell
var shell = require('shelljs');

module.exports = function (grunt) {
  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    // Watch Task
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      }, 
      hogan: {
        files: ['public/templates/*.html'],
        tasks: ['hogan']
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/{,*/}*.js',
          'public/styles/less/{,*/}*.less'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      less: {
        development: {
          options: {
            paths: ['public/styles/less'],
            yuicompress: true
          }
        },
        files: ['public/styles/{,*/}*.less'],
          tasks: ['less']
      }
    },
    //
    // Less
    //
    less: {
      development: {
        options: {
          paths: ['public/styles/less'],
          yuicompress: true
        },
        files: {
          'public/styles/css/style.css': 'public/styles/less/style.less'
        }
      }
    },
    // Hogan
    // Precompile hogan templates for client application
    hogan: {
      publish: {
        options: {
          prettify: true,
          defaultName: function(filename) {
              return ( filename.split('/').pop() ).split('.')[0];
          }
        },
        files:{
          'public/js/templates.js': ['public/templates/**/*.html']
        }
      }
    }

  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
        var reloaded = !err && res.statusCode === 200;
        if (reloaded)
          grunt.log.ok('Delayed live reload successful.');
        else
          grunt.log.error('Unable to make a delayed live reload.');
        done(reloaded);
      });
    }, 500);
  });

  // this task should work, but doesn't anyway.
  // this is what I get for going against the grunt task way.
  grunt.registerTask('loadAuthors', 'give out cred', function() {
    // grab our authors, cut out their contributions (showing that would be
    // unclassy), sort and convert to JSON representable format.
    var bower = grunt.file.readJSON('bower.json');
    var pkg   = grunt.file.readJSON('package.json');
    grunt.log.ok('Processing git log for authors');
    var authors = shell.exec('git shortlog -sne | cut -f 1 --complement | sort | sed "s/^/\"/;s/$/\",/"');
    var authorsObj = JSON.parse("[" + authors + "]");
    bower.authors = pkg.contributors = authorsObj;
    grunt.log.ok('Updating bower.json');
    grunt.file.write(bower);
    grunt.log.ok('Updating package.json');
    grunt.file.write(pkg);
  });

  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-hogan');

  grunt.registerTask('default', ['develop', 'watch']);
};
