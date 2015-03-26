module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-json-minify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-sass');
	
	grunt.initConfig({
		concat: {
			scripts: {
				src: ['dev/scripts/autocomplete.js',
				'dev/scripts/angularapp.js',
				'dev/scripts/controllers/main.js'],
				dest: 'dist/scripts/app.js'
			},
			styles: {
				src: ['dev/styles/fixed-element.css',
					'dev/styles/about-me.css',
					'dist/styles/fonts.css',
					'dev/styles/reset.css',
					'dev/styles/my-work.css',
					'dev/styles/autocomplete.css'],
				dest: 'dist/styles/app.css'
			}
		},
		// sass: {
		// 	app: {
		// 		files: {
		// 			'tmp/app.css': ['sass/style.scss'] //not use yet
		// 		}
		// 	}
		// },
		copy: { //copy json file
		  main: {
		    src: 'dev/models/data.json',
		    dest: 'dist/models/data.json',
		  },
		},
		//Min stuff
		uglify:{
			scripts: {
				files: {
					'dist/scripts/my-work.min.js' : 'dev/scripts/my-work.js'
				}
			}
		},
		cssmin: {
			app: {
				files: {
					'dist/styles/app.min.css': 'dist/styles/app.css'
				}
			}
		},
		'json-minify': { //not include copy
		  build: {
		    files: 'dist/models/*.json'
		  }
		},
		htmlmin: {                                     
		    'view-main': {                                      
		      options: {                                 
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                  
		        'dist/views/my-work.html': 'dev/views/my-work.html',
		        'dist/views/about-me.html': 'dev/views/about-me.html'
		        //'dist/views/404.html': 'dev/views/404.html' //useless
		      }
		    }
		},
		watch: {
			scripts: {
				files: 'scripts/**/*.js',
				// tasks: ['coffee', 'concat:scripts', 'uglify'],
				tasks: ['concat:scripts'],
				options: {
					spawn: false,
					livereload : true
				}
			},
			styles: {
				files: 'styles/**/*.css',
				tasks: ['concat'],
				options: {
					spawn: false,
					livereload : true
				}
			},
			html:{
				files: 'views/**/*.html',
				tasks: ['htmlmin'],
				options: {
					spawn: false,
					livereload : true
				}
			}
		},
	  	imagemin: {
		    png: {
		      options: {
		        optimizationLevel: 7
		      },
		      files: [
		        {
		          expand: true,
		          cwd: 'dev/img/',
		          src: ['**/*.png'],
		          dest: 'dist/img/',
		          ext: '.png'
		        }
		      ]
		    },
		    jpg: {
		      options: {
		        progressive: true
		      },
		      files: [
		        {
		          // Set to true to enable the following options…
		          expand: true,
		          cwd: 'dev/img/',
		          src: ['**/*.jpg'],
		          dest: 'dist/img/',
		          ext: '.jpg'
		        }
		      ]
		    }
	  	}
	});

	//only html & css tasks do very good!
	grunt.registerTask('build', "Builds the application.",['htmlmin','concat','cssmin']);
};


