'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserifyShim = require('browserify-shim');
var watchify = require('watchify');
var livereload = require('gulp-livereload');
var git = require('./git');

module.exports = gulp.task('browserify', function () {

    var filename = global.config.filenames.release.scripts;

    git.getHash(function (hash) {

        filename = filename.replace('{HASH}', hash);

        return browserify({
            entries: [global.config.paths.src.modules]
        })
        .transform(browserifyShim)
        .bundle()
        .pipe(source(filename))
        .pipe(gulp.dest(global.config.paths.dest.release.scripts));

    });

});
