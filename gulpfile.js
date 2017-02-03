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
var cp = require('child_process');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

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
  return gulp.src(['_site/app/img/**/*.+(png|jpg|gif|svg)', '!app/img/originalImages/', '!app/img/originalImages/**/*'])
          .pipe(cache(imagemin({
            //Setting interlced to true
            progressive:true,
            interlced:true,
          })))
          .pipe(gulp.dest('_site/dist/img/'));
});

//copying font files
gulp.task('fonts', function(){
  return gulp.src('_site/app/fonts/**/*')
          .pipe(gulp.dest('_site/dist/fonts'));
});

//copying video files
gulp.task('video', function(){
  return gulp.src('_site/app/res/**/*')
          .pipe(gulp.dest('_site/dist/res'));
});

//cleaning up
//cleant the directory
gulp.task('clean:dist', function(){
  return del.sync('_site/dist');
});

//clear the image cache
gulp.task('clean:cache', function(callback){
  return cache.clearAll(callback);
});


//initializing the development environment
gulp.task('browserSync',function(){
  browserSync.init({
    server:{baseDir:'_site/app'}
  });
});

//initializing the production environment
gulp.task('productionServer', function(){
  browserSync.init({
    server:{baseDir:'_site/dist'}
  });
});

//copying minified files with html files
gulp.task('useref', function(){
    return gulp.src('_site/app/*.html')
            .pipe(useref())
            //minifies only if it's a js file
            .pipe(gulpIf('*.js', uglify()))
            //minifies only if it's a css file
            .pipe(gulpIf('*.css', cssnano()))
            .pipe(gulp.dest('_site/dist'));
});

//development workflow : watch tasks
gulp.task('watch', ['sass','jekyll-build','browserSync'],function(){
  gulp.watch(['app/scss/**/*.scss','app/css/**/*.css'],['sass', 'jekyll-rebuild']);
  gulp.watch(['app/**/*.html','_layouts/**', '_includes/**','_projects/**','_experiences/**'],['jekyll-rebuild']);
  gulp.watch('app/js/**/*.js', ['jekyll-rebuild']);
  gulp.watch('app/**/*.md', ['jekyll-rebuild']);
  gulp.watch('_config.yml', ['jekyll-rebuild']);
});

gulp.task('default', ['watch']);

//producation workflow
gulp.task('build',function(callback){
  runSequence('clean:dist',
    'sass',
    'jekyll-build',
    ['useref','images','fonts', 'video'],
    'productionServer',
    callback
  );
});
