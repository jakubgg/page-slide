module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        modernizr: {
            dist: {
                "devFile"            : "bower_components/modernizr/modernizr.js",
                "outputFile"         : "bower_components/modernizr/modernizr-custom.min.js",

                // Based on default settings on http://modernizr.com/download/
                "extra"              : {
                    "shiv"      : false,
                    "printshiv" : false,
                    "load"      : false,
                    "mq"        : false,
                    "cssclasses": true
                },

                // Based on default settings on http://modernizr.com/download/
                "extensibility"      : {
                    "addtest"       : false,
                    "prefixed"      : false,
                    "teststyles"    : false,
                    "testprops"     : false,
                    "testallprops"  : false,
                    "hasevents"     : false,
                    "prefixes"      : false,
                    "domprefixes"   : false,
                    "cssclassprefix": ""
                },

                // Define any tests you want to implicitly include.
                "tests"              : ['cssanimations'],

                // By default, this task will crawl your project for references to Modernizr tests.
                // Set to false to disable.
                "parseFiles"         : false,

                // When parseFiles = true, matchCommunityTests = true will attempt to
                // match user-contributed tests.
                "matchCommunityTests": false,
            }
        },

        concat: {
            css: {
                src : [
                    'bower_components/normalize-css/normalize.css',
                    'bower_components/animate.css/animate.min.css', //generated by subgrunt task
                    'src/css/PageSlide.css'
                ],
                dest: 'web/css/PageSlide.css'
            },
            js : {
                options: {
                    separator: ';\n'
                },
                src    : [
                    'bower_components/modernizr/modernizr-custom.min.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery.smoothstate/jquery.smoothState.js'
                ],
                dest   : 'web/js/build.js'
            }
        },

        copy: {
            dev  : {
                src : 'src/js/PageSlide.js',
                dest: 'web/js/PageSlide.js'
            },
            setup: {
                files: [
                    {
                        src : 'cfg/bower/animate-config.json',
                        dest: 'bower_components/animate.css/animate-config.json'
                    },
                    {
                        src : 'bower_components/headjs/dist/1.0.0/head.load.min.js',
                        dest: 'web/js/head.js'
                    }
                ]
            }
        },

        uglify: {
            dist: {
                files: [
                    {'web/js/build.js': 'web/js/build.js'},
                    {'web/js/head.js': 'web/js/head.js'},
                    {'web/js/PageSlide.js': 'web/js/PageSlide.js'}
                ]
            }
        },

        subgrunt: {
            animateCss: [
                'bower_components/animate.css'
            ]
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision  : -1
            },
            target : {
                files: {
                    'web/css/PageSlide.css': ['web/css/PageSlide.css']
                }
            }
        },

        clean: ['web/js/PageSlide.js', 'web/js/build.js', 'web/css/PageSlide.css'],

        watch: {
            scripts: {
                files  : ['src/js/*.js'],
                tasks  : ['default'],
                options: {
                    spawn  : false,
                    atBegin: true
                }
            }
        },

        htmlSnapshot: {
            all: {
                options: {
                    snapshotPath     : '.',
                    sitePath         : 'http://nst.local.dev',
                    fileNamePrefix   : '',
                    msWaitForPages   : 1000,
                    sanitize         : function (requestUri) {
                        //returns 'index.html' if the url is '/', otherwise a prefix
                        if (/^\/$/.test(requestUri)) {
                            return '/index';
                        }
                        return requestUri;
                    },
                    replaceStrings: [
                        {'/js/': 'web/js/'},
                        {'/css/': 'web/css/'}
                    ],
                    //here goes the list of all urls that should be fetched
                    urls             : [
                        '/',
                        '/page2',
                        '/page2-1',
                        '/page2-2',
                        '/page2-2-1',
                        '/page2-2-2',
                        '/page2-2-3',
                        '/page3'
                    ]
                }
            }
        }
    });

    grunt.registerTask('setup', ['modernizr', 'copy:setup', 'copy:dev', 'subgrunt', 'concat:css', 'concat:js']);
    grunt.registerTask('default', ['clean', 'concat:css', 'concat:js', 'copy:dev']);
    grunt.registerTask('production', ['setup', 'uglify', 'cssmin']);
};
