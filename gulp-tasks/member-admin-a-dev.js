module.exports = function(gulp, getStamp, del, concat, source, replace,  uglify, filesCommon, filesApp ){
return function(){

  files = filesCommon.concat(filesApp);
  var fileName = "main-member-admin-a.js";
  var serverDir = "./public/py/handlers/templates/member/admin/a/";
  gulp.src(files)
    .pipe(concat(fileName))
    //.pipe(uglify())
    .pipe(gulp.dest('./public/js'));
  gulp.src(serverDir+'index.html')
    .pipe(replace(/main-member-admin-a([0-9]*).js(\?*[0-9]*)/g, fileName+'?'+getStamp()))
    .pipe(gulp.dest(serverDir));


};
};

