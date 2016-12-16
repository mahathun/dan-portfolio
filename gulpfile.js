var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat')
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin');

//generate minified concatenated version of the javascript files
gulp.task('script',function(){
  gulp.src(['src/js/dist/*.js', 'src/js/*.js', 'src/js/backgroundVideo/backgroundVideo.js'])
    .pipe(plumber())
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'));
});

//generate minified concatenated stylesheet file
gulp.task('stylesheet', function(){
  gulp.src('src/css/*.css')
    .pipe(plumber())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('css/'))
});

// compress images
gulp.task('image', function(){
  gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('img'))
});

//watch for changes to js files`
//watch for changes to css files
gulp.task('watch', function(){
  gulp.watch('src/js/**/*.js', ['script']);
  gulp.watch('src/css/**/*.css', ['stylesheet']);
});


gulp.task('default',['script', 'stylesheet']);
