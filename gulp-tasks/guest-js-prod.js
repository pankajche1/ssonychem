module.exports = function(gulp, getStamp, del, concat, source, replace,  uglify, filesCommon, filesApp ){
  return function(){
    ////    name of the file that we want to produce:
    var fileName = 'main-guest'+getStamp()+'.js';
    files = filesCommon.concat(filesApp);
    // this is the folder in which the index.html file is:
    var serverDir = "./public/py/handlers/templates/guest/";
    //delete any such file like main-guest.js type:
    del([ 'public/js/main-guest*.js' ]);

     gulp.src(files).pipe(concat(fileName))
      .pipe(uglify())
      .pipe(gulp.dest('./public/js'));
    gulp.src(serverDir+"index.html").pipe(replace(/main-guest([0-9]*).js(\?*[0-9]*)/g, fileName)).pipe(gulp.dest(serverDir));
    ////
  };
};

