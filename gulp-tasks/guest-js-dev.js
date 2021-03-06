module.exports = function(gulp, getStamp, del, concat, source, replace,  uglify, filesCommon, filesApp ){
return function(){

  files = filesCommon.concat(filesApp);
  var fileName = "main-guest.js";
  var serverDir = "./public/py/handlers/templates/guest/";
   gulp.src(files)
    .pipe(concat(fileName))
    //.pipe(uglify())
    .pipe(gulp.dest('./public/js'));
  gulp.src(serverDir+'index.html')
    .pipe(replace(/main-guest([0-9]*).js(\?*[0-9]*)/g, fileName+'?'+getStamp()))
    .pipe(gulp.dest(serverDir));


};
};

