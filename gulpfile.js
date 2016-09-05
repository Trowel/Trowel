var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('template', function() {
  return gulp.src('demo/src/index.html')
    .pipe(gulp.dest('demo/dest'));
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
    return gulp.src('demo/src/scss/style.scss')
    .pipe($.sass({
        precision: 6,
        outputStyle: 'expanded',
        sourceComments: false,
        indentWidth: 4,
    }))
    .on('error', report_error)
    .pipe(gulp.dest('demo/dest'));
});

gulp.task('test', function () {
    return gulp.src('test/test.scss')
    .pipe($.sass());
});

gulp.task('watch', ['default'], function() {
  browserSync({
    notify: false,
    logPrefix: 'trowel',
    server: ['demo/dest']
  });

  gulp.watch(['src/**/*.scss', 'demo/src/**/*.scss'], ['scss', reload]);
  gulp.watch('demo/src/**/*.html', ['template', reload]);
});

gulp.task('default', ['template', 'scss']);
