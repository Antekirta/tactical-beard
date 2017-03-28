(function () {
    'use strict';

    const gulp = require('gulp'),

        browserSync = require('browser-sync'),

        runSequence = require('run-sequence'),

        $ = require('gulp-load-plugins')();

     // paths

    const ROOT = 'web';

    const MODULES = ROOT + '/modules';

    const VENDOR = ROOT + '/vendor';

    const SASS_SRC = MODULES + '/**/sass/*.sass';

    const VENDOR_CSS = [
        VENDOR + '/bootstrap/dist/css/bootstrap.min.css'
    ];

    const APP_JS_SRC = [
        MODULES + '/**/*.js',

        MODULES + '/**/**/*.js'
    ];

    const VENDOR_JS_SRC = [
        VENDOR + '/jquery/dist/jquery.min.js',

        VENDOR + '/angular/angular.js',

        VENDOR + '/angular-ui-router/release/angular-ui-router.min.js',

        VENDOR + '/lodash/lodash.js'
    ];

    function lazyRequireTask(taskName, path, options) {
        options = options || {};
        options.taskName = taskName;

        gulp.task(taskName, function (callback) {
            var task = require(path).call(this, options);

            return task(callback);
        });
    }

    lazyRequireTask('clean', './gulp-tasks/clean.js', {
        src: ROOT + '/css/app-*.css'
    });

    lazyRequireTask('sass', './gulp-tasks/sass.js', {
        src: ROOT + '/modules/**/sass/*.sass',
        concat: 'app-style.css',
        dest: ROOT + '/css'
    });

    lazyRequireTask('app-logic', './gulp-tasks/app-logic.js', {
        src: APP_JS_SRC,
        concat: 'app-logic.min.js',
        dest: 'web/js/'
    });

    lazyRequireTask('app-styles', './gulp-tasks/app-styles.js', {
        src: SASS_SRC,
        concat: 'app-styles.min.css',
        dest: 'web/css/'
    });

    lazyRequireTask('vendor-logic', './gulp-tasks/vendor-logic.js', {
        src: VENDOR_JS_SRC,
        concat: 'vendor-logic.min.js',
        dest: 'web/js/'
    });

    lazyRequireTask('vendor-styles', './gulp-tasks/vendor-styles.js', {
        src: VENDOR_CSS,
        concat: 'vendor-styles.min.css',
        dest: 'web/css/'
    });

    lazyRequireTask('min-css', './gulp-tasks/min-css.js', {
        src: ROOT + '/css/',
        dest: ''
    });


    gulp.task('dev-build', function(callback) {
        runSequence('clean', 'app-logic', 'app-styles', callback);
    });

    gulp.task('build', function(callback) {
        runSequence('clean', 'app-logic', 'vendor-logic', 'app-styles', 'vendor-styles', callback);
    });

    gulp.task('watch', function () {
        gulp.watch(SASS_SRC, gulp.series('app-styles'));

        gulp.watch(APP_JS_SRC, gulp.series('app-logic'));
    });

    gulp.task('serve', function() {
        browserSync.init({
            server: 'web'
        });

        browserSync.watch('web/**/*.*').on('change', browserSync.reload);
    });
})();