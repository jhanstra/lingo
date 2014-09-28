var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (but not starting it yet)
  var server = express();
// Add live reload
  server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
  server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
  server.all('/*', function(req, res) {
      res.sendfile('index.html', { root: 'dist' });
    });

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of definition (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/scripts/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'))
  .pipe(refresh(lrserver));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));
  // Images
  gulp.src('./app/images/**/*')
  .pipe(gulp.dest('dist/images'));

  // Any other view files from app/views
  gulp.src('./app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh(lrserver)); // Tell the lrserver to refresh

});

// Dev task
gulp.task('dev', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('watch');
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({
    onError: function(e) { console.log(e); },
    sourceComments: 'map'
    }))
  // Optionally add autoprefixer
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  // These last two should look familiar now :)
  .pipe(gulp.dest('dist/css/'))
  .pipe(refresh(lrserver));
});

gulp.task('watch', ['lint'], function() {
  // Watch our scripts
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js', 'app/views/*.html','app/views/**/*.html','app/styles/*.scss','app/styles/**/*.scss','app/index.html'],[
    'lint',
    'browserify',
    'views',
    'styles'
  ]);
});

gulp.task('default' , function() {
     gulp.start('lint','browserify','views','dev','styles','watch');
});












// var gulp = require('gulp'),
//     sass = require('gulp-ruby-sass'),
//     autoprefixer = require('gulp-autoprefixer'),
//     minifycss = require('gulp-minify-css'),
//     jshint = require('gulp-jshint'),
//     uglify = require('gulp-uglify'),
//     imagemin = require('gulp-imagemin'),
//     rename = require('gulp-rename'),
//     concat = require('gulp-concat'),
//     notify = require('gulp-notify'),
//     cache = require('gulp-cache'),
//     connect = require('gulp-connect'),
//     gutil = require('gulp-util'),
//     browserify = require('gulp-browserify'),
//     livereload = require('gulp-livereload'),
//     del = require('del'),
//     clean = require('gulp-clean');

// gulp.task('styles', function() {
//   return gulp.src('app/css/styles.sass')
//     .pipe(sass({ style: 'expanded' }))
//     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(gulp.dest('dist/assets/css'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(minifycss())
//     .pipe(gulp.dest('dist/assets/css'))
//     .pipe(notify({ message: 'Styles task complete' }));
// });
//
// gulp.task('scripts', function() {
//   return gulp.src('src/scripts/**/*.js')
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('default'))
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest('dist/assets/js'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/assets/js'))
//     .pipe(notify({ message: 'Scripts task complete' }));
// });
//
// gulp.task('watch', function() {
//   // Watch .scss files
//   gulp.watch('src/styles/**/*.scss', ['styles']);
//   // Watch .js files
//   gulp.watch('src/scripts/**/*.js', ['scripts']);
//   // Watch image files
//   gulp.watch('src/images/**/*', ['images']);
//   // Create LiveReload server
//   // livereload.listen();
//   // // Watch any files in dist/, reload on change
//   // gulp.watch(['dist/**']).on('change', livereload.changed);
// });
//
// gulp.task('webserver', function() {
//   connect.server({
//   });
// });


//
// gulp.task('default' , function() {
//     gulp.start('lint','browserify','watch');
// });
