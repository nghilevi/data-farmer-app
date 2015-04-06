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
				src: ["dev/app/directives/baTree.js","dev/app/directives/baCheckboxtree.js","dev/app/app.js","dev/app/controllers/main.js"],
				dest: 'dist/scripts/app.js'
			}
		},
		copy: { //copy json file
		  json: {
		    src: 'dev/models/data.json',
		    dest: 'dist/models/data.json',
		  },
		  // dep:{ //deployment
		  // 	files: [
		  //      // flattens results to a single level
		  //      {expand: true, flatten: true, src: ['dev/**'], dest: 'dep/', filter: 'isFile'},
		  //   ]
		  // }
		},
		//Min stuff
		uglify:{
			dist: {
				files: {
					'dist/scripts/app.min.js' : 'dist/scripts/app.js'
				}
			}
		},
		cssmin: {
			dist: {
				files: {
					'dist/styles/app.min.css': 'dev/styles/app.css'
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
		        'dist/views/404.html': 'dev/views/404.html',
		        'dist/views/baCheckboxtree.html': 'dev/views/baCheckboxtree.html',
		        'dist/views/baTree.html': 'dev/views/baTree.html',
		        'dist/views/home.html': 'dev/views/home.html',
		        'dist/views/organizations_tree.html': 'dev/views/organizations_tree.html',
		        'index-dep-official.html':'index-dep.html'
		      }
		    }
		}
	});

	grunt.registerTask('buildJson',"Copy and minify json",['copy:json','json-minify']);
	grunt.registerTask('build', "Build distribution version",['concat:dist','uglify:dist','buildJson', 'htmlmin:dist','cssmin:dist']);
};


