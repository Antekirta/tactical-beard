const gulp = require('gulp');

const $ = require('gulp-load-plugins')();

module.exports = function (options) {
  return function () {
      return gulp.src(options.src + 'app-style.css')
          .pipe($.csso())
          .pipe($.rename(options.src + 'app-style.min.css'))
          .pipe(gulp.dest(options.dest));
  };
};