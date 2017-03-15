var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('visual-tests-template', function() {
  return gulp.src('tests/visual-tests/src/index.html')
    .pipe(gulp.dest('tests/visual-tests/dest'));
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

gulp.task('visual-tests-scss', function () {
    return gulp.src('tests/visual-tests/src/style.scss')
    .pipe($.sass({
        precision: 6,
        outputStyle: 'expanded',
        sourceComments: false,
        indentWidth: 4,
    }))
    .on('error', report_error)
    .pipe(gulp.dest('tests/visual-tests/dest'));
});

gulp.task('visual-tests', ['visual-tests-template', 'visual-tests-scss'])

gulp.task('unit-tests', function () {
    return gulp.src('./tests/unit-tests/unit-tests.scss')
    .pipe($.sass());
});


gulp.task('watch', ['default'], function() {
  browserSync({
    notify: false,
    logPrefix: 'trowel',
    server: ['tests/visual-tests/dest']
  });

  gulp.watch(['src/**/*.scss', 'tests/visual-tests/src/**/*.scss'], ['visual-tests-scss', reload]);
  gulp.watch('tests/visual-tests/src/**/*.html', ['visual-tests-template', reload]);
});

gulp.task('default', ['visual-tests']);
