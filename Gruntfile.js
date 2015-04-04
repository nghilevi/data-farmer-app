module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-json-minify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-ngmin');
	 
	grunt.initConfig({
		concat: {
			scripts: {
				src: ["app/directives/baTree.js","app/directives/baCheckboxtree.js","app/app.js","app/controllers/main.js"],
				dest: 'dist/scripts/app/app.js'
			}
		},
		copy: { //copy json file
		  main: {
		    src: 'models/data.json',
		    dest: 'dist/models/data.json',
		  },
		},
		//Min stuff
		uglify:{
			scripts: {
				files: {
					'dist/scripts/app/app.min.js' : 'dist/scripts/app/app.js'
				}
			}
		},
		cssmin: {
			app: {
				files: {
					'dist/styles/app.min.css': 'styles/app.css'
				}
			}
		},
		'json-minify': { //not include copy
		  build: {
		    files: 'dist/models/data.json'
		  }
		},
		htmlmin: {                                     
		    'view-main': {                                      
		      options: {                                 
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                  
		        'dist/views/404.html': 'views/404.html',
		        'dist/views/baCheckboxtree.html': 'views/baCheckboxtree.html',
		        'dist/views/baTree.html': 'views/baTree.html',
		        'dist/views/home.html': 'views/home.html',
		        'dist/views/organizations_tree.html': 'views/organizations_tree.html',
		      }
		    }
		},
		ngmin: {
		  controllers: {
		    src: ['app/app.js','app/controllers/main.js'],
		    dest: 'dist/scripts/app.js'
		  },
		  directives: {
		    expand: true,
		    cwd: 'app',
		    src: ['directives/**/*.js'],
		    dest: 'dist/scripts'
		  }
		}
	});

	//only html & css tasks do very good!
	grunt.registerTask('buildJson',"Copy and minify json",['copy','json-minify']);
	grunt.registerTask('buildWithJson', "Builds the application with buildJson tasks.",['concat','uglify','buildJson', 'htmlmin','cssmin']);
	grunt.registerTask('build', "Builds the application.",['concat','uglify', 'htmlmin','cssmin']);
};


