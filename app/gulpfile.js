/*
 * @desc define the dependency  
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rimraf = require('rimraf');

var dist = 'C:/Install/Apache Software Foundation/Apache2.2/htdocs/MJ-NOTES/';
var path = {
	src : 'src/',
	assets : 'assets/',
	dist : {
		js : dist + 'js/',
		css : dist + 'css/',
		assets : dist + 'assets/'
	}
}

/*
 * @desc Cleans the build directory  
 */
gulp.task('clean', function(cb) {
  rimraf(dist, cb);
});

/*
 * @desc Move HTML files to dist directory
 */
gulp.task('copy', ['copy:html', 'copy:assets']);

/*
 * @desc Move HTML files to dist directory
 */
gulp.task('copy:html', function() {
  return gulp.src(['index.html','test.html', path.src+'**/*.html'])
    .pipe(gulp.dest(dist));
});

/*
 * @desc Move assets files to dist directory
 */
gulp.task('copy:assets', function() {
  return gulp.src(path.assets+'**/*.*')
    .pipe(gulp.dest(path.dist.assets));
});

/*
 * @desc Convert SASS file to CSS
 */
gulp.task('sass', function () {
  return gulp.src(path.src + 'app-sass.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(rename('app.css'))
    .pipe(gulp.dest(path.dist.css));
});


/*
 * @desc Concatenate & Minify JS
 */
gulp.task('scripts', function() {
    return gulp.src([path.src + '**/*.js', '!' + path.assets + '*.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('default', ['copy', 'sass', 'scripts'])