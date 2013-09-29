var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var skiplistConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        skiplist: skiplistConfig,
        watch: {
            options: {
                spawn: false
            },
            coffee: {
                files: ['<%= skiplist.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= skiplist.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= skiplist.dist %>/*',
                        '!<%= skiplist.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= skiplist.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= skiplist.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= skiplist.app %>/images',
                javascriptsDir: '<%= skiplist.app %>/scripts',
                fontsDir: '<%= skiplist.app %>/styles/fonts',
                importPath: '<%= skiplist.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        replace: {
            dist: {
                options: {
                    patterns: [{ json: grunt.file.readJSON('config.json') }]
                },
                files: [{ src: ['<%= skiplist.app %>/initialization.js'],
                          dest: '<%= skiplist.dist %>/scripts/initialization.js'}]
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= skiplist.dist %>'
            },
            html: [
                '<%= skiplist.app %>/popup.html',
                '<%= skiplist.app %>/options.html'
            ]
        },
        usemin: {
            options: {
                dirs: ['<%= skiplist.dist %>']
            },
            html: ['<%= skiplist.dist %>/{,*/}*.html'],
            css: ['<%= skiplist.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= skiplist.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= skiplist.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= skiplist.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= skiplist.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= skiplist.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= skiplist.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= skiplist.app %>',
                    src: '*.html',
                    dest: '<%= skiplist.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= skiplist.app %>',
                    dest: '<%= skiplist.dist %>',
                    src: [
                        'initialization.js',
                        'scripts/oauth2/**/*',
                        '*.{ico,png,txt}',
                        'images/{,*/}*.{webp,gif}',
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= skiplist.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'compass:server'
            ],
            test: [
                'coffee',
                'compass'
            ],
            dist: [
                'coffee',
                'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        chromeManifest: {
            dist: {
                options: {
                    buildnumber: true,
                    background: {
                        target:'scripts/background.js'
                    }
                },
                src: '<%= skiplist.app %>',
                dest: '<%= skiplist.dist %>'
            }
        },
        compress: {
            dist: {
                options: {
                    archive: 'package/Skiplist.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
                    dest: ''
                }]
            }
        }
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'chromeManifest:dist',
        'useminPrepare',
        'concurrent:dist',
        'cssmin',
        'concat',
        //'uglify',
        'copy',
        'replace',
        'usemin',
        'compress'
    ]);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);
};
