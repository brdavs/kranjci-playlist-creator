var gulp = require('gulp');
// var shell = require('gulp-shell');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var ignore = require('gulp-ignore');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var rsync = require('gulp-rsync');
var sass = require('gulp-sass');

var dev_dir = './src/';
var dest_dir = './dist/';


/*
 * SASS Tasks
 */
gulp.task('sass-compile', function() {
    gulp.src([
        dev_dir+'scss/app.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dev_dir+'css/'));
});

gulp.task('sass-watch',function() {
    gulp.watch([dev_dir+'scss/**/*'],['sass-compile']);
});

/*
 * Copy tasks
 */
gulp.task('rsync-media', function() {
    return gulp.src([
            dev_dir+'media/**',
        ])
        .pipe(rsync({
            incremental: true,
            progress: true,
            root: dev_dir,
            destination: dest_dir
        }));
});

gulp.task('rsync-jplayer-skin', function() {
    return gulp.src([
            dev_dir+'bower_components/jPlayer/dist/skin/blue.monday/image/**',
        ])
        .pipe(rsync({
            incremental: true,
            progress: true,
            root: dev_dir,
            destination: dest_dir+'/image',
            relative: false
        }));
});

gulp.task('rsync-fonts', ['rsync-media'], function() {
    return gulp.src([
        dev_dir+'bower_components/**/*.eot',
        dev_dir+'bower_components/**/*.svg',
        dev_dir+'bower_components/**/*.ttf',
        dev_dir+'bower_components/**/*.woff',
        dev_dir+'bower_components/**/*.woff2'
    ])
    .pipe(rsync({
        incremental: true,
        progress: true,
        destination: dest_dir+'fonts',
        relative: false
    }));
});


/*
 * Obfuscate tasks
 */
gulp.task('html-replace', ['sass-compile', 'rsync-media'], function() {
    return gulp.src([
        dev_dir+'index.html'
    ])
    .pipe(useref())
    .pipe(gulpif('*.css', csso()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest(dest_dir));
});

gulp.task('html-minify', ['html-replace'], function() {
    return gulp.src([
        dest_dir+'index.html',
        dev_dir+'**/_*.html'
    ])
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(dest_dir));
});


/*
 * Default tasks
 */
gulp.task('default', [
    'rsync-fonts',
    'rsync-media',
    'rsync-jplayer-skin',
    'sass-compile',
    'html-replace',
    'html-minify'
]);
