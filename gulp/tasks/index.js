'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var minifyHTML = require('gulp-minify-html');
var git = require('./git');

module.exports = gulp.task('index', function () {

    var path = global.release ? global.config.paths.dest.release.index : global.config.paths.dest.build.index;

    git.getHash(function (hash) {

        return gulp.src(global.config.paths.src.index)
            .pipe(gulpif(global.release, minifyHTML({comments: true, empty: true, spare: true, quotes: true})))
            .pipe(gulpif(global.release,
                replace('<!--styles-->', '<link href="' + global.config.filenames.release.styles.replace('{HASH}', hash) + '" rel="stylesheet">'),
                replace('<!--styles-->', '<link href="' + global.config.filenames.build.styles + '" rel="stylesheet">')
            ))
            .pipe(gulpif(global.release,
                replace('<!--scripts-->', '<script src="' + global.config.filenames.release.scripts.replace('{HASH}', hash) + '"></script>'),
                replace('<!--scripts-->', '<script src="' + global.config.filenames.build.scripts + '"></script>')
            ))
            .pipe(gulp.dest(path));

    });

});
