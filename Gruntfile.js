module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-json-minify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	 
	grunt.initConfig({
		concat: {
			dist: {
				src: ["app/directives/baTree.js","app/directives/baCheckboxtree.js","app/app.js","app/controllers/main.js"],
				dest: 'dist/scripts/app/app.js'
			},
			dep: {
				src: ["dep/baTree.js","dep/directives/baCheckboxtree.js","dep/app.js","dep/controllers/main.js"],
				dest: 'dep/app-dep.js'
			}
		},
		copy: { //copy json file
		  json: {
		    src: 'models/data.json',
		    dest: 'dist/models/data.json',
		  },
		  dep:{ //deployment
		  	files: [
		       // flattens results to a single level
		       {expand: true, flatten: true, src: ['dev/**'], dest: 'dep/', filter: 'isFile'},
		    ]
		  }
		},
		//Min stuff
		uglify:{
			dist: {
				files: {
					'dist/scripts/app/app.min.js' : 'dist/scripts/app/app.js'
				}
			},
			dep: {
				files: {
					'dep/app-dep.min.js' : 'dep/app-dep.js'
				}
			}
		},
		cssmin: {
			dist: {
				files: {
					'dist/styles/app.min.css': 'styles/app.css'
				}
			},
			dep: {
				files: {
					'dep/app.min.css': 'dep/app.css'
				}
			}
		},
		'json-minify': { //not include copy
		  build: {
		    files: 'dist/models/data.json'
		  }
		},
		htmlmin: {                                     
		    dist: {                                      
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
		    },
		    dep:{                                      
		      options: {                                 
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                  
		        'dep/404.html': 'dep/404.html',
		        'dep/baCheckboxtree.html': 'dep/baCheckboxtree.html',
		        'dep/baTree.html': 'dep/baTree.html',
		        'dep/home.html': 'dep/home.html',
		        'dep/organizations_tree.html': 'dep/organizations_tree.html',
		      }
		    }
		}
	});

	//only html & css tasks do very good!
	grunt.registerTask('buildJson',"Copy and minify json",['copy:json','json-minify']);
	grunt.registerTask('build', "Builds distribution version",['concat:dist','uglify:dist','buildJson', 'htmlmin:dist','cssmin:dist']);
	//grunt.registerTask('buildDep', "Builds deployment version",['concat:dep','uglify:dep','htmlmin:dep','cssmin:dep']);
	grunt.registerTask('buildDep',['concat:dep','uglify:dep']);
};


