const gulp = require('gulp');

const $ = require('gulp-load-plugins')();

module.exports = function (options) {
  return function () {
    return gulp.src(options.src)
        .pipe($.sass())
        .pipe($.plumber({
            errorHandler: $.notify.onError(function (err) {
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe($.concatCss(options.concat))
        .pipe($.csso())
        .pipe(gulp.dest(options.dest));
  };
};