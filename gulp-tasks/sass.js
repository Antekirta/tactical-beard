const gulp = require('gulp');

const $ = require('gulp-load-plugins')();

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe($.sass())
            .pipe($.autoprefixer({ browsers: ['last 2 version'] }))
            .pipe($.concatCss(options.concat))
            .pipe(gulp.dest(options.dest));
    };
};