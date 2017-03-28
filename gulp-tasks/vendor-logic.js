const gulp = require('gulp');

const $ = require('gulp-load-plugins')();

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe($.concat(options.concat))
            .pipe($.uglify())
            .pipe(gulp.dest(options.dest));
    };
};