var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('template', function() {
  return gulp.src('test/src/index.html')
    .pipe(gulp.dest('test/dest'));
});

AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
var report_error = function(error) {
  $.notify({
    title: 'An error occured with a Gulp task',
    message: 'Check you terminal for more informations'
  }).write(error);

  console.log(error.toString());
  this.emit('end');
};

gulp.task('scss', function () {
    return gulp.src('test/src/scss/style.scss')
    // .pipe($.sourcemaps.init())
    .pipe($.sass({
        precision: 6,
        outputStyle: 'expanded',
        sourceComments: false,
        indentWidth: 4,
    }))
    .on('error', report_error)
    // .pipe($.autoprefixer({
    //     browsers: [
    //       'ie >= 10',
    //       'ie_mob >= 10',
    //       'ff >= 30',
    //       'chrome >= 34',
    //       'safari >= 7',
    //       'opera >= 23',
    //       'ios >= 7',
    //       'android >= 4.4',
    //       'bb >= 10'
    //     ]
    // }))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest('test/dest'));
});

gulp.task('watch', ['default'], function() {
  browserSync({
    notify: false,
    logPrefix: 'trowel',
    server: ['test/dest']
  });

  gulp.watch(['src/**/*.scss', 'test/src/**/*.scss'], ['scss', reload]);
  gulp.watch('test/src/**/*.html', ['template', reload]);
});

gulp.task('default', ['template', 'scss']);
