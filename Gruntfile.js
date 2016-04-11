// Generated on 2014-04-25 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);


  //load tasks
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-sass');


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      sass: {
        files: [
          '<%= yeoman.app %>/styles/**/*.{scss,sass}'
        ],
        tasks: ['sass:server', 'autoprefixer'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['ngconstant:development']
      },
      scripts: {
        files: [
          '<%= yeoman.app %>/templates/**/*.tpl.html'
        ],
        tasks: ['html2js'],
        options: {
          livereload: true
        }
      },
      includeSource: {
        files: ['<%= yeoman.app %>/index.html'],
        tasks: ['includeSource:development']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/**/*.css',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: ['.tmp', '<%= yeoman.app %>/.tmp']
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: '<%= yeoman.app %>/'
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: '<%= yeoman.app %>/bower_components/'
      }
    },

    //Compile Sass to css
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed', //Determines the output format of the final CSS style. Default: nested Values: nested, expanded, compact, compressed
        includePaths: [
          './bower_components',
          '<%= yeoman.app %>/styles/'
        ]
      },
      server: {
        files: {
          '<%= yeoman.app %>/.tmp/styles/app.css': '<%= yeoman.app %>/styles/main.scss'
        }
      },
      dist: {
        options: {
          sourceMap: false
        },
        files: {
          '<%= yeoman.app %>/.tmp/styles/app.css': '<%= yeoman.app %>/styles/main.scss'
        }
      }
    },

    ngconstant: {
      options: {
        name: 'config',
        dest: '<%= yeoman.app %>/scripts/config.js'
      },

      //targets
      development: {
        constants: {
          AppURLs: grunt.file.readJSON('app/config/dev-config.json')
        }
      },

      production: {
        constants: {
          AppURLs: grunt.file.readJSON('app/config/prod-config.json')
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/styles/**/*.css',
            '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },

    html2js: {
      options: {
        base: '<%= yeoman.app %>/templates',
        module: 'somafm.tpls',
        quoteChar: '\'',
        useStrict: true
      },
      core: {
        src: ['<%= yeoman.app %>/templates/**/*.tpl.html'],
        dest: '<%= yeoman.app %>/.tmp/templates.js'
      }
    },

    // Automatically inject all scripts/.js files into the app's index.html
    includeSource: {
      options: {
        basePath: 'app',
        baseUrl: ''
      },
      development: {
        files: {
          '.tmp/index.html': '<%= yeoman.app %>/index.html'
        }
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': '<%= yeoman.app %>/index.html'
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.dist %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      js: ['<%= yeoman.dist %>/**/*.js'],
      css: ['<%= yeoman.dist %>/styles/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images'],
        patterns: {
          js: [
            [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{app/images}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{app/images}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/app',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/app'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '(!index)*.html',
              'views/**/*.html',
              'images/**/*.{webp,png,jpg,jpeg,gif}',
              'styles/fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          }]
      },
      server: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/styles',
            dest: '.tmp/styles/',
            src: '**/*.css'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/styles/fonts',
            dest: '<%= yeoman.app %>/.tmp/styles/fonts',
            src: '*'
          }
        ]
      }
    },

    //Text replace to replace bower paths to local paths
    replace: {
      bower_css: {
        src: ['<%= yeoman.dist %>/styles/*.css'], // includes files in dir
        overwrite: true,
        replacements: [
          {
            from: '/bower_components/bootstrap/dist/fonts/',
            to: 'fonts/'
          },
          {
            from: [
              '/bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap',
              '/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/'
            ],
            to: 'fonts/'
          }
        ]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:server',
        'sass:server'
      ],
      test: [
        'copy:server',
        'sass'
      ],
      dist: [
        'sass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    uglify: {
      options: {
        mangle: false
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('serve', function (target) {

    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'ngconstant:development',
      'html2js',
      'includeSource:development',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',
    'ngconstant:production',
    'html2js',
    'includeSource:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'imagemin',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin',
    'replace'
  ]);

  grunt.registerTask('server', [
    'update-config-dev',
    'serve:app'
  ]);

  grunt.registerTask('server-dist', [
    'serve:dist'
  ]);

  grunt.registerTask('update-config-dev', [
    'ngconstant:development'
  ]);

  grunt.registerTask('update-config-prod', [
    'ngconstant:production'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
