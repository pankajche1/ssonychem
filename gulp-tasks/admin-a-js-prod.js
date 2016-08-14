module.exports = function(gulp, getStamp, del, browserify, source, replace, buffer, uglify, ngAnnotate ){
return function(){
////
	var filename = 'main-admin-a'+getStamp()+'.js';
	//delete any such file like main-guest.js type:
	del([ 'public/js/main-admin-a*.js' ]);
	// browserify the file for guest module:
	browserify('./app/admin/a/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source(filename))
        .pipe(buffer())// this is imp before ugilfy()
         .pipe(ngAnnotate({add:true}))
        .pipe(uglify())
	.pipe(gulp.dest('./public/js/'));
	// cache bust on the html page script tag:
	//gulp.src('./public/py/handlers/templates/**/*.html')
	//.pipe(replace(/main-guest([0-9]*).js/g, filename))
	//.pipe(gulp.dest('./public/py/handlers/templates/'));
	gulp.src('./public/py/handlers/templates/admin/a/index.html')
	//.pipe(replace(/main-guest.js\?([0-9]*)/g, filename))
	.pipe(replace(/main-admin-a([0-9]*).js(\?*[0-9]*)/g, filename))
	.pipe(gulp.dest('./public/py/handlers/templates/admin/a'));
	
////
};
};

