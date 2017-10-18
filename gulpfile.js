const gulp = require('gulp');
//const browserSync = require('browser-sync').create();
const browserSync = require('browser-sync');
const reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task('serve', ['nodemon'], () => {
  // browserSync.init({
  //   //notify: true,
  //   port: 9000,    
  //   middleware: function (req, res, next) {
  //     res.setHeader('Access-Control-Allow-Origin', '*');
  //     res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  //     res.setHeader('Access-Control-Allow-Methods', '*');
  //     res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
  //     res.setHeader('Access-Control-Allow-Credentials', 'true');
  //     next();
  //   },
  //   server: {
  //     baseDir: 'app/client',
  //   },
  //   cors: false
  // });

  browserSync.init(null, {
		    proxy: "http://localhost:5000",
        files: ["app/client/*.*"],        
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
