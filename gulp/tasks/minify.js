'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var git = require('./git');

module.exports = gulp.task('minify', function () {

    git.getHash(function (hash) {

        var fileName = global.config.filenames.release.scripts.replace('{HASH}', hash);

        // Minify the JS, CSS is already minified with by Stylus compiler
        return gulp.src(global.config.paths.dest.release.scripts + '/' + fileName)
            .pipe(uglify())
            .pipe(gulp.dest(global.config.paths.dest.release.scripts));

    });

});
