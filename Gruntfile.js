'use strict';

module.exports = function(grunt) {
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	var config = {
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Project Paths Configuration
		 * ===============================
		 */
		paths: {
			dist: 'dist',// Production ready HTML templates and Assets
			src: 'src',// Sources - Twig Templates and Assets 
			templates: '<%= paths.src %>/templates',// Template sources
			tmp: 'dev',// Temporary files for Grunt local server
		},

		/**
		 * Information about available hosts.
		 * Development: Grunt local server information: use from cli "grunt dev"
		 * ===============================
		 */
		hosts: {
			development: {
				global_assets_dir: '/dev/',
				url: 'http://localhost',
				port: 8000,
			}
		},

		/**
		 * Twig templates.
		 * Warning: The Twig plugin does not support some Twig functions: macros/filters creation...
		 * @TODO: Understand if not supported Twig functions are bugs. 
		 * ===============================
		 */
		output_twig: {
				options: {
					docroot: '<%= paths.templates %>/',
				},
				dist: {
					files: [
						{
							expand: true,
							cwd: '<%= paths.templates %>/',
							src: ['**/*.twig', '!includes/*.twig', '!layouts/*.twig'],
							dest: '<%= paths.dist %>/',
							ext: '.html'
						}
					]
				},
				dev: {
					files: [
						{
							expand: true,
							cwd: '<%= paths.templates %>/',
							src: ['**/*.twig', '!includes/*.twig', '!layouts/*.twig'],
							dest: '<%= paths.tmp %>/',
							ext: '.html'
						}
					]
				},
		},

		/**
		 * Optimize all images
		 * ===============================
		 */
		imagemin: {
			options: {
				progressive: false
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= paths.src %>/images',
					src: ['**/*.{gif,png,jpg,GIF,PNG,JPG}'],
					dest: '<%= paths.dist %>/images'
				}]
			},
			dev: {
				files: [{
					expand: true,
					cwd: '<%= paths.src %>/images',
					src: ['**/*.{gif,png,jpg,GIF,PNG,JPG}'],
					dest: '<%= paths.tmp %>/images'
				}]
			},
		},

		/**
		 * SASS
		 * ===============================
		 */
		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none'
				},
				files: {
					'<%= paths.dist %>/css/screen.css': '<%= paths.src %>/sass/screen.sass'
				}
			},
			dev: {
				options: {
					sourcemap: 'auto'
				},
				files: {
					'<%= paths.tmp %>/css/screen.css': '<%= paths.src %>/sass/screen.sass'
				}
			},
		},

		/**
		 * Autoprefixer
		 * ===============================
		 */
		autoprefixer: {
			dist: {
				options:{
					browsers: ['last 10 version', 'ie >= 8']
				},
				files: {
					'<%= paths.dist %>/css/screen.css': '<%= paths.dist %>/css/screen.css'
				},
			},
			dev: {
				options:{
					browsers: ['last 10 version', 'ie >= 8']
				},
				files: {
					'<%= paths.tmp %>/css/screen.css': '<%= paths.tmp %>/css/screen.css'
				},
			},
		},

		/**
		 * CSSLint
		 * ===============================
		 */
		csslint: {
			dist: {
				src: ['<%= paths.dist %>/css/screen.css']
			},
			dev: {
				src: ['<%= paths.tmp %>/css/screen.css']
			},
		},

		/**
		 * Parker CSS <https://github.com/katiefenn/parker>
		 * ===============================
		 */
		parker: {
			dist: {
				options: {},
				src: ['<%= paths.dist %>/css/screen.css']
			},
			dev: {
				options: {},
				src: ['<%= paths.tmp %>/css/screen.css']
			},
		},

		/**
		 * Generation of Sass styleguide for mixins, extends, functions.
		 * Tool: SassDoc <http://sassdoc.com/>
		 * @command: grunt sassdoc
		 * ===============================
		 */
		sassdoc: {
			default: {
				src: '<%= paths.src %>/sass/**/*.sass',
				options: {
					dest: 'doc/sass'
				}
			},
		},
		//@TODO: apply sassdoc annotation to sass codebase 
		//@TODO: implement CSS styleguide generator
		/*
			https://github.com/indieisaconcept/grunt-styleguide
			https://github.com/kneath/kss
			https://www.npmjs.com/package/grunt-kss
			http://mikefowler.me/2013/10/14/static-styleguides-kss-node/
			http://trulia.github.io/hologram/
		*/

		/**
		 * Watch for new changes.
		 * Automatically called from:
		 * @command: grunt dev
		 * ===============================
		 */
		watch: {
			options: {
				interrupt: true,
				livereload: true,
			},

			config: {
				files: ['Gruntfile.js'],
			},

			images: {
				files: ['<%= paths.src %>/images/**/*.{gif,png,jpg,GIF,PNG,JPG}'],
				tasks: ['imagemin:dev']
			},

			src: {
				files: ['<%= paths.src %>/**/*.twig'],
				tasks: ['output_twig:dev']
			},

			sass: {
				files: ['<%= paths.src %>/sass/**/*.sass'],
				tasks: ['sass:dev', 'autoprefixer:dev']
			},
		},

		/**
		 * Concurrent execution for watch task during grunt dev
		 * ===============================
		 */
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			dev: ['watch']
		},
		
		/**
		 * Execute Grunt local server for development environment. 
		 * @command: grunt dev -> Automatically opens a new tab in the default browser on http://localhost:8000/
		 * ===============================
		 */
		connect: {
			options: {
				hostname: '*',
				port: '<%= hosts.development.port %>',
				open: '<%= hosts.development.url %>:<%= hosts.development.port %>/dev/'
			},
			dev: {
				options: {
					livereload: true
				}
			},
		},
	};

	/*
	 * Project configuration
	 */
	grunt.initConfig(config);

	/*
	 * Tasks
	 */
	grunt.registerTask('default', [
		'output_twig:dist',
		'imagemin:dist',
		'sass:dist',
		'autoprefixer:dist',
	]);
	grunt.registerTask('dev', [
		'output_twig:dev',
		'sass:dev',
		'autoprefixer:dev',
		'connect:dev',
		'concurrent'
	]);
	grunt.registerTask('css-analysis', [
		'csslint:dist',
		'parker:dist',
	]);
	grunt.registerTask('css-analysis:dev', [
		'csslint:dev',
		'parker:dev',
	]);
};