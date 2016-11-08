module.exports = function(grunt){
  // Configure task(s)
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    uglify:{
      build:{
        src:['src/js/jquery.1.11.1.js', 'src/js/bootstrap.js','src/js/contact_me.js',
            'src/js/jqBootstrapValidation.js','src/js/jquery.isotope.js','src/js/jquery.parallax.js',
            'src/js/jquery.prettyPhoto.js','src/js/main.js','src/js/main2.js', 'src/js/SmoothScroll.js',
            'src/js/backgroundVideo/backgroundVideo.js'],
        dest:'js/script.min.js'
      },//uglify build

      dev:{
        options:{
          // beautify:true,
          mangle:false,
          compress:false,
          preserveComments:'all'
        },
        src:['src/js/jquery.1.11.1.js', 'src/js/bootstrap.js','src/js/contact_me.js',
            'src/js/jqBootstrapValidation.js','src/js/jquery.isotope.js','src/js/jquery.parallax.js',
            'src/js/jquery.prettyPhoto.js','src/js/main.js','src/js/main2.js', 'src/js/SmoothScroll.js',
            'src/js/backgroundVideo/backgroundVideo.js'],
        dest:'js/script.min.js'
      }// beatify dev

    },//uglify

    concat:{
      css:{
        src:['src/css/*.css','src/css/fonts/font-awesome/css/*.css'],
        dest:'css/styles.css'
      }

    },//concat

    watch :{

      js:{

        files:['src/js/*.js'],
        tasks:['uglify:dev']
      },
      css:{
        files:['src/css/*.css'],
        tasks:['concat:css']
      }

    },//watch


  });

  // Load the plugings
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Register task(s).
  grunt.registerTask('default',['uglify:dev', 'concat:css']);
  grunt.registerTask('build',['uglify:build','concat:css']);
  grunt.registerTask('dev',['uglify:dev','concat:css']);

};
