var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

//compiling sass files
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
          .pipe(sass())
          .pipe(gulp.dest('app/css'))
          .pipe(browserSync.reload({
            stream:true
          }));

});

//optimize images
gulp.task('images', function(){
  return gulp.src(['app/img/**/*.+(png|jpg|gif|svg)', '!app/img/originalImages/', '!app/img/originalImages/**/*'])
          .pipe(cache(imagemin({
            //Setting interlced to true
            progressive:true,
            interlced:true,
          })))
          .pipe(gulp.dest('dist/img/'));
});

//copying font files
gulp.task('fonts', function(){
  return gulp.src('app/fonts/**/*')
          .pipe(gulp.dest('dist/fonts'));
});

//copying video files
gulp.task('video', function(){
  return gulp.src('app/res/**/*')
          .pipe(gulp.dest('dist/res'));
});

//cleaning up
//cleant the directory
gulp.task('clean:dist', function(){
  return del.sync('dist');
});

//clear the image cache
gulp.task('clean:cache', function(callback){
  return cache.clearAll(callback);
});


//initializing the development environment
gulp.task('browserSync',function(){
  browserSync.init({
    server:{baseDir:'app'}
  });
});

//initializing the production environment
gulp.task('productionServer', function(){
  browserSync.init({
    server:{baseDir:'dist'}
  });
});

//copying minified files with html files
gulp.task('useref', function(){
    return gulp.src('app/*.html')
            .pipe(useref())
            //minifies only if it's a js file
            .pipe(gulpIf('*.js', uglify()))
            //minifies only if it's a css file
            .pipe(gulpIf('*.css', cssnano()))
            .pipe(gulp.dest('dist'));
});

//development workflow : watch tasks
gulp.task('watch', ['browserSync','sass'],function(){
  gulp.watch('app/scss/**/*.scss',['sass']);
  gulp.watch('app/**/*.html',browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

//producation workflow
gulp.task('build',function(callback){
  runSequence('clean:dist',
    ['sass','useref','images','fonts', 'video'],
    'productionServer',
    callback
  );
});
