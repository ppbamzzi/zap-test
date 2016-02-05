module.exports = function(grunt) {

    // 1. Вся настройка находится здесь ,'postcss'
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: ['less/modules/*.less'],
        dest: 'less/style.less',
      }
    },

    less: {
      development: {
        files: {
          "css/style.css": "less/style.less",
          "css/responsive.css": "less/responsive.less"
        }
      }
      },
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['css/*.css', '!*.min.css'],
          ext: '.min.css'
        }]
      }
    },
    postcss: {
  options: {
    map: true,
    processors: [
      require('autoprefixer')({browsers: ['last 5 version']})
    ]
  },
  dist: {
    src: 'css/style.css'
  }
},
    watch: {
      scripts: {
        files: ['less/modules/*.less',
                'less/responsive.less'],
        tasks: ['concat','less'],
        options: {
          interrupt: true,
        },
      },
    },
    browserSync: {
    dev: {
        bsFiles: {
            src : [
                'less/*.less',
                '*.html'
            ]
        },
        options: {
            watchTask: true,
            server: './'
        }
    }
    }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-postcss');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['watch']);

};
