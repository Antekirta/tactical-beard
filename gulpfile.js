(function () {
    'use strict';

    /* VARIABLES start*/

    /* GULP PLUGINS start */

    var gulp = require('gulp'),

        modRewrite  = require('connect-modrewrite'),

        requireDir = require('require-dir'),

	      runSequence = require('run-sequence'),

        browserSync = require('browser-sync'),

	      browserify = require('browserify'),

        clean = require('gulp-clean'),

        sass = require('gulp-sass'),

        autoprefixer = require('gulp-autoprefixer'),

        csso = require('gulp-csso'),

        concatCss = require('gulp-concat-css'),

        concat = require('gulp-concat'),

        uglify = require('gulp-uglify'),

        $ = require('gulp-load-plugins');

    /* GULP PLUGINS end */


    /* CUSTOM VARIABLES start */

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

    // const VENDOR_JS_SRC = ROOT + '/vendor/**/*.js';
    const VENDOR_JS_SRC = [
      VENDOR + '/angular/angular.js',

      VENDOR + '/angular-ui-router/release/angular-ui-router.min.js',

      VENDOR + '/lodash/lodash.js'
    ];

    const PARTIALS_SRC = MODULES + '/**/partials/*.html';

    const DEST = {
        'CSS': ROOT + '/css'
    };

    /* CUSTOM VARIABLES and */

    /* VARIABLES end*/





    /* PRIMITIVE TASKS start */

    gulp.task('clean', function () {
        return gulp.src(DEST.CSS + '/app-style.css')
          .pipe(clean());
    });

    gulp.task('sass', function () {
        return gulp.src(SASS_SRC)
          .pipe(sass())
          .pipe(autoprefixer({ browsers: ['last 2 version'] }))
          .pipe(concatCss('app-style.css'))
          .pipe(gulp.dest(DEST.CSS));
    });

    gulp.task('app-logic', function() {
        return gulp.src(APP_JS_SRC)
          .pipe(concat('app-logic.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('web/js/'));
    });

    gulp.task('vendor-logic', function() {
        console.log('VENDOR_JS_SRC: ', VENDOR_JS_SRC);
        return gulp.src(VENDOR_JS_SRC)
          .pipe(concat('vendor-logic.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('web/js/'));
    });

    gulp.task('minCss', function () {
        return gulp.src(DEST.CSS + '/app-style.css')
          .pipe(csso())
          .pipe(gulp.dest(DEST.CSS + '/min'))
          .pipe(browserSync.reload({
            stream: true
          }));
    });

    gulp.task('vendor-css', function() {
        gulp.src(VENDOR_CSS)
          .pipe(concatCss('vendor-style.css'))
          .pipe(csso())
          .pipe(gulp.dest('web/css/'));
    });

    gulp.task('browserSync', function() {
        browserSync({
          server: {
            baseDir: 'web',

            middleware: [
              modRewrite([
                  '!\\.\\w+$ /index.html [L]'
              ])
            ]
          }
        })
    });

    /* PRIMITIVE TASKS end */

    /* COMBINED TASKS start */

    gulp.task('dev-build', function(callback) {
        runSequence('clean', 'app-logic', 'sass', 'minCss',  callback);
    });

    /* COMBINED TASKS end */



    gulp.task('watch', ['browserSync', 'dev-build'], function () {
        gulp.watch(SASS_SRC, ['dev-build']);

        gulp.watch(DEST.CSS, browserSync.reload);

        gulp.watch(PARTIALS_SRC, browserSync.reload);

        gulp.watch(APP_JS_SRC, ['dev-build']);

        gulp.watch('web/index.html', browserSync.reload);
    });

})();