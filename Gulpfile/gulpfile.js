var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var jpegtran = require('imagemin-jpegtran');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(changed('dist'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('autoprefixer', function () {
    return gulp.src(['src/*.css', 'src/**/*.css'])
        .pipe(changed('dist'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-html', ['compress-js', 'autoprefixer', 'sass'], function() {
    return gulp.src(['src/*.html', 'src/**/*.html'])
        .pipe(changed('dist'))
        .pipe(htmlmin())
        .pipe(useref())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('compress-js', function() {
    return gulp.src(['src/*.js', 'src/**/*.js'])
        .pipe(changed('dist'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('compress-img', function() {
    return gulp.src(['src/*.jpg', 'src/**/*.jpg'])
        .pipe(changed('dist/images'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [jpegtran()]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function(){
    gulp.watch(['src/*.css', 'src/**/*.css'], ['autoprefixer'])
    gulp.watch('./sass/**/*.scss', ['sass'])
    gulp.watch(['src/*.js', 'src/**/*.js'], ['compress-js'])
    gulp.watch(['src/*.html', 'src/**/*.html'], ['minify-html'])
    gulp.watch(['src/*.jpg', 'src/**/*.jpg'], ['compress-img'])
});

gulp.task('default', ['minify-html', 'compress-img', 'compress-js'], function(){
    console.log('Finished Gulping')
});

/*Convert SASS files into CSS files (gulp-sass)
Auto-prefix CSS styles (gulp-autoprefixer)
Minify CSS files (gulp-csso)
Minify HTML files (gulp-htmlmin)
Minify image files (gulp-imagemin)
Minify JS files (gulp-uglify)
Concatenated CSS and JS files. (gulp-useref)*/
