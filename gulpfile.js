var gulp = require('gulp');

var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('connect', function() {
  connect.server({
    livereload: true
  })
})

gulp.task('html', function() {
  return gulp.src('./**/*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function() {
	return gulp.src('./sass/**/*.{scss,sass}')
		.pipe(sass())
		.pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});


gulp.task('watch', function () {
  gulp.watch(['./sass/**/*.{scss,sass}'], ['sass']);
  gulp.watch(['./**/*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
