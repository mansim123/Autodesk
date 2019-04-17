let gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-csso'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function () {
    return gulp.src('./src/sass/**/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', function () {
    return gulp.src('./src/javascript/app.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('default', function() {
    gulp.watch('./src/sass/**/*.scss', ['css']);
});