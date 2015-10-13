'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var nib = require('nib');
var git = require('./git');

module.exports = gulp.task('styles', function () {

    var fileName = global.release ? global.config.filenames.release.styles : global.config.filenames.build.styles;
    var path = global.release ? global.config.paths.dest.release.styles : global.config.paths.dest.build.styles;

    git.getHash(function (hash) {

        fileName = fileName.replace('{HASH}', hash);


        return gulp.src(global.config.paths.src.styles)
            .pipe(sourcemaps.init())
            .pipe(gulpif(global.release, stylus({ use: [nib()], compress: true, 'include css': true}), stylus({ use: [nib()], 'include css': true}) ))
            .pipe(gulpif(!global.release, sourcemaps.write('./'))) // TODO: use external sourcemaps
            .pipe(rename(fileName))
            .pipe(gulp.dest(path))
            .pipe(livereload());

    });

});
