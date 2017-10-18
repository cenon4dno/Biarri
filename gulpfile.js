const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task('serve', ['nodemon'], () => { 
  browserSync.init(null, {
		    proxy: "http://localhost:5000",
        port: 7000,
	});

  gulp.watch([
    'app/**/*.html',
    'app/**/*.js',
    'app/**/*.css'
  ]).on('change', reload);
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app/server/app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});
