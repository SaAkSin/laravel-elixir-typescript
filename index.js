var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var gulp   = require('gulp');
var Elixir = require('laravel-elixir');
var fileExists = require('file-exists');
var path = require('path');

var _ = require('underscore');

var $ = Elixir.Plugins;
var config = Elixir.config;

var tsFolder = path.join(config.assetsPath, 'typescript');
var tsOutput = path.join(config.publicPath, 'js', 'app');

Elixir.extend('typescript', function(src, output) {
    var paths = prepGulpPaths(src, output);

    new Elixir.Task('typescript', function() {
        this.log(paths.src, paths.output);

        // check if there is an tsconfig.json file --> initialize ts project
        var tsConfigPath = path.join(tsFolder, 'tsconfig.json');
        var tsProject = ts.createProject(tsConfigPath);

        return (
            gulp
                .src(paths.src.path)
                .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
                .pipe(tsProject())
                .pipe($.if(config.production, $.uglify()))
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Elixir.Notification('TypeScript Compiled!'))
        );
    })
        .watch(path.join(paths.src.baseDir, "**/*.ts"))
        .ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, tsFolder)
        .output(output || tsOutput, ' <- js Files');
};