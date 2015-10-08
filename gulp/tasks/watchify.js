'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var livereload = require('gulp-livereload');

module.exports = gulp.task('watchify', function () {

    var bundler = watchify(browserify(global.config.paths.src.modules));

    bundler.transform(browserifyShim);

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            .on('error', function (err) {

                gutil.log(gutil.colors.red("Browserify compile error:"), "\n\n", err.message, "\n");
                gutil.beep();
                this.emit('end'); // end this stream
            })
            .pipe(source(global.config.filenames.build.scripts))
            .pipe(gulp.dest(global.config.paths.dest.build.scripts))
            .pipe(livereload());
    }

    return rebundle();
});
