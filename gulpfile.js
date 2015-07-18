var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');

var paths = {
    sass: ['./scss/**/*.scss'],
    mySass: ['./src/sass/**/*.scss'],
    js: ['./src/js/**/*.js'],
    html: ['./src/js/kanjireview/**/*.html']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('my-sass', function(done){
    gulp.src('./src/sass/main.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('js', function(done){
    gulp.src(['./src/js/KanjiReview.js', './src/js/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./www/js/'))
        .on('end', done);
});

gulp.task('html', function(done){
    //del(['./www/html/**/*']);
    gulp.src('./src/js/kanjireview/**/*.html')
        .pipe(gulp.dest('./www/html/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.mySass, ['my-sass']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
