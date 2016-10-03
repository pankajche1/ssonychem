var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var del = require('del');
var karma = require('gulp-karma');
var buffer = require('vinyl-buffer');
//var ngAnnotate = require('browserify-ngannotate');
var ngAnnotate = require('gulp-ng-annotate');
// requires browserify and vinyl-source-stream
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var ngHtml2Js = require("gulp-ng-html2js");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();
var less = require('gulp-less');
//var sass = require('gulp-sass');
var minifyCSS  = require('gulp-minify-css');  
var rename     = require('gulp-rename');  
var header     = require('gulp-header'); 
var replace     = require('gulp-replace'); 
var notify     = require('gulp-notify'); 
require('gulp-bash-completion')(gulp);
//build datestamp for cache busting
var getStamp = function() {
  var myDate = new Date();
  var myYear = myDate.getFullYear().toString();
  var myMonth = ('0' + (myDate.getMonth() + 1)).slice(-2);
  var myDay = ('0' + myDate.getDate()).slice(-2);
  var minutes = ('0' + myDate.getMinutes()).slice(-2);
  var mySeconds = myDate.getSeconds().toString();

  var myFullDate = myYear + myMonth + myDay + minutes + mySeconds;

  return myFullDate;
};
var filesCommon = [
  './app/common/templates/templates-common.js',
  './app/common/app.js',
  './app/common/services/*.js',
  './app/common/controllers/*.js',
  './app/common/directives/*.js'
];

var filesGuestApp = [
  './app/guest/templates/guest-templates.js',
  './app/guest/app.js',
  './app/guest/services/*.js',
  './app/guest/controllers/*.js',
  './app/guest/directives/*.js'

];

var filesMemberGeneralApp = [
    './app/member/general/templates/member-general-templates.js',
    './app/member/general/app.js',
    './app/member/general/services/*.js',
    './app/member/general/controllers/*.js',
    './app/member/general/directives/*.js'

  ];

var filesMemberAdminAApp = [
    './app/member/admin/a/templates/member-admin-a-templates.js',
    './app/member/admin/a/app.js',
    './app/member/admin/a/services/*.js',
    './app/member/admin/a/controllers/*.js',
    './app/member/admin/a/directives/*.js'

  ];



/**
 * build for production
 */
// cache busting
//browserify makes this file: 'main-guest.js'
gulp.task('build-guest-prod',[],
	  require('./gulp-tasks/guest-js-prod')(gulp, getStamp,del, browserify,
                                                source, replace, buffer, uglify, ngAnnotate));
gulp.task('build-admin-a-prod',[],
	  require('./gulp-tasks/admin-a-js-prod')(gulp, getStamp,del, browserify,
                                                  source, replace, buffer, uglify, ngAnnotate));
// prod mode and dev mode
// in prod mode you don't do cache busting cz in local browser u can do ctrl+f5 to load no cache.,
// but in dev mode you can use file?bust kind of thing to avoid ctrl+f5 things
//1 dev mode main.guest.js?bust thing.
//these kind of scenes can be there: 1: build-guest-prod -> browserify-guest-dev -> build-guest-dev
//at any time we can have these 1: main-guest.js?1234 or
//if it is main-guest.js?12345 and can run three commands:1: build-guest-prod OK work
//2: build-guest-dev OK work 
//3: browserify-guest-dev ok work
//Now next: any time you can have this: main-guest12345.js
//then you can run 1: build-guest-prod ok works
//or u can run 2:build-guest-dev
//if it is main-guest12345.js? and can run three commands:1: build-guest-prod OK work
//2: build-guest-dev ok
//3: browserify-guest-dev
gulp.task('build1-guest-dev',function(){
  // you can these formats pre existing:
  // main-guest234521.js or main-guest.js?22334 
  var fileName = 'main-guest.js?'+getStamp();
  del([ 'public/js/main-guest*.js' ]);
  browserify('./app/guest/app.js')
    .bundle()
    .pipe(source('main-guest.js'))
    .pipe(gulp.dest('./public/js/'));
  // here you have to change the script tag in html page: 
  gulp.src('./public/py/handlers/templates/guest/index.html')
    .pipe(replace(/main-guest([0-9]*).js(\?*[0-9]*)/g, fileName))
    .pipe(gulp.dest('./public/py/handlers/templates/guest'));
});
gulp.task('build-admin-a-dev',function(){
  // you can these formats pre existing:
  // main-guest234521.js or main-guest.js?22334 
  var fileName = 'main-admin-a.js?'+getStamp();
  del([ 'public/js/main-admin-a*.js' ]);
  browserify('./app/admin/a/app.js')
    .bundle()
    .pipe(source('main-admin-a.js'))
    .pipe(gulp.dest('./public/js/'));
  // here you have to change the script tag in html page: 
  gulp.src('./public/py/handlers/templates/admin/a/index.html')
    .pipe(replace(/main-admin-a([0-9]*).js(\?*[0-9]*)/g, fileName))
    .pipe(gulp.dest('./public/py/handlers/templates/admin/a'));
});
/* templates */
gulp.task('template-common',function(){
  var concat = require('gulp-concat');
  return gulp.src("./app/common/templates/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(ngHtml2Js({
      moduleName: "TemplatesCommon",
      prefix: "/common/templates/"
    }))
    .pipe(concat('templates-common.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./app/common/templates/"));


});//template common
gulp.task('template-guest',function(){
  var concat = require('gulp-concat');
  return gulp.src("./app/guest/templates/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(ngHtml2Js({
      moduleName: "TemplatesGuest",
      prefix: "/guest/templates/"
    }))
    .pipe(concat('guest-templates.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./app/guest/templates/"));


});//template guest
/*
template member general
*/
gulp.task('template-member-general',function(){
  var concat = require('gulp-concat');
  return gulp.src("./app/member/general/templates/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(ngHtml2Js({
      moduleName: "TemplatesMemberGeneral",
      prefix: "/member/general/templates/"
    }))
    .pipe(concat('member-general-templates.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./app/member/general/templates/"));


});//template guest
gulp.task('template-member-admin-a',function(){
  var concat = require('gulp-concat');
  return gulp.src("./app/member/admin/a/templates/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(ngHtml2Js({
      moduleName: "TemplatesMemberAdminA",
      prefix: "/member/admin/a/templates/"
    }))
    .pipe(concat('member-admin-a-templates.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./app/member/admin/a/templates/"));


});//template admin a
/**
 * this is in dev mode
 */
/* external libs */
gulp.task('browserify-lib-dev', function() {
  // Grabs the app.js file
  browserify('./app/lib/app.js')
    .bundle()
    .pipe(source('lib.js'))
    .pipe(gulp.dest('./public/js/'));

});


gulp.task('concat-lib-dev', function() {
  // because by browserify the underscore lib was not coming before all other libs so I simply concatnated it

  var lstLibs = [                 "./node_modules/underscore/underscore-min.js",
                                  "./node_modules/angular/angular.min.js",
                                  "./node_modules/angular-route/angular-route.min.js",
                                  "./node_modules/angular-animate/angular-animate.min.js",
                                  "./node_modules/angular-resource/angular-resource.min.js"

                ]

  return gulp.src(lstLibs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./public/js'));
  // you can also put the timestamp thing here. for futher removing of the tension.

});

//function(gulp, getStamp, del, concat, source, replace,  uglify, filesCommon, filesApp ){
gulp.task('build-guest-dev',[],
	  require('./gulp-tasks/guest-js-dev')(gulp, getStamp, del, concat,
                                                source, replace, uglify, filesCommon, filesGuestApp));
gulp.task('build-member-general-dev',[],
	  require('./gulp-tasks/member-general-dev')(gulp, getStamp, del, concat,
                                                source, replace, uglify, filesCommon, filesMemberGeneralApp));
gulp.task('build-member-admin-a-dev',[],
	  require('./gulp-tasks/member-admin-a-dev')(gulp, getStamp, del, concat,
                                                source, replace, uglify, filesCommon, filesMemberAdminAApp));

/*
gulp.task('browserify-guest-dev', function() {
  // Grabs the app.js file
  browserify('./app/guest/app.js')
    .bundle()
    .pipe(source('main-guest.js'))
  //.pipe(buffer())// this is imp before ugilfy()
  //         .pipe(ngAnnotate({add:true}))
  //        .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
  //change the html for cache bust in local server:
  gulp.src('./public/py/handlers/templates/guest/index.html')
    .pipe(replace(/main-guest([0-9]*).js(\?*[0-9]*)/g, 'main-guest.js?' + getStamp()))
    .pipe(gulp.dest('./public/py/handlers/templates/guest'));
});
*/
gulp.task('browserify-admin-a-dev', function() {
  // Grabs the app.js file
  browserify('./app/admin/a/app.js')
    .bundle()
    .pipe(source('main-admin-a.js'))
  //.pipe(buffer())// this is imp before ugilfy()
  //         .pipe(ngAnnotate({add:true}))
  //        .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
  //change the html for cache bust in local server:
  gulp.src('./public/py/handlers/templates/admin/a/index.html')
    .pipe(replace(/main-admin-a([0-9]*).js(\?*[0-9]*)/g, 'main-admin-a.js?' + getStamp()))
    .pipe(gulp.dest('./public/py/handlers/templates/admin/a'));
});

/* Task to compile less */
//gulp.task('less', ['less-compile']);  
gulp.task('less', function() {  

  var filename = 'main.min-'+getStamp()+'.css';
  del(['./public/css/main.min-*.css']);
  gulp.src('./styles/less/module2/main.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename(filename))
    .pipe(gulp.dest('./public/css/'));
  gulp.src('./public/py/handlers/templates/**/*.html')
    .pipe(replace(/main.min-([0-9]*).css/g, filename))
    .pipe(gulp.dest('./public/py/handlers/templates/'));
  
});
gulp.task('cssmin',function(){
  var filename = 'main.min-'+getStamp()+'.css';
  del(['./public/css/main.min-*.css']);
  gulp.src('./styles/less/module2/main.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename(filename))
    .pipe(gulp.dest('./public/css/'));
  gulp.src('./public/py/handlers/templates/**/*.html')
    .pipe(replace(/main.min-([0-9]*).css/g, filename))
    .pipe(gulp.dest('./public/py/handlers/templates/'));
  
  
});
/**
 *
 * a common watch for all
 */
gulp.task('watch', function() {
  //guest module:
  //no need to watch guest browserify thing. cause now it will be concatnated.
  //gulp.watch('app/guest/**/*.js', ['browserify-guest-dev']);
  gulp.watch('./app/common/templates/**/*.html', ['template-common']);
  gulp.watch('./app/guest/templates/**/*.html', ['template-guest']);
  gulp.watch('./app/member/general/templates/**/*.html', ['template-member-general']);
  //admin a module:
  //gulp.watch('app/admin/a/**/*.js', ['browserify-admin-a-dev']);
  gulp.watch('./app/member/admin/a/templates/**/*.html', ['template-member-admin-a']);
  //less css
  gulp.watch('./styles/less/**/*.less', ['less']);
});
gulp.task('watch-common-template', function() {
  gulp.watch('./app/common/templates/**/*.html', ['template-common']);
  gulp.watch('./styles/less/**/*.less', ['less']);
});
gulp.task('watch-guest', function() {
  gulp.watch('app/guest/**/*.js', ['build-guest-dev']);
  gulp.watch('app/common/**/*.js', ['build-guest-dev']);
  gulp.watch('./app/guest/templates/**/*.html', ['template-guest']);
  gulp.watch('./app/common/templates/**/*.html', ['template-common']);
  gulp.watch('./styles/less/**/*.less', ['less']);
});
gulp.task('watch-guest-template', function() {
  gulp.watch('./app/common/templates/**/*.html', ['template-common']);
  gulp.watch('./app/guest/templates/**/*.html', ['template-guest']);
  gulp.watch('./styles/less/**/*.less', ['less']);
});
gulp.task('watch-member-general', function() { 

  gulp.watch('app/common/**/*.js', ['build-member-general-dev']);;
  gulp.watch('app/member/general/**/*.js', ['build-member-general-dev']);
  gulp.watch('./app/common/templates/**/*.html', ['template-common']);
  gulp.watch('./app/member/general/templates/**/*.html', ['template-member-general']);
  gulp.watch('./styles/less/**/*.less', ['less']);
});
gulp.task('watch-member-general-template', function() {
  gulp.watch('./app/common/templates/**/*.html', ['template-common']);
  gulp.watch('./app/member/general/templates/**/*.html', ['template-member-general']);
  gulp.watch('./styles/less/**/*.less', ['less']);
});
// member admin a:
gulp.task('watch-member-admin-a', function() { 

  gulp.watch('app/common/**/*.js', ['build-member-admin-a-dev']);;
  gulp.watch('app/member/admin/a/**/*.js', ['build-member-admin-a-dev']);
  gulp.watch('./app/common/templates/**/*.html', ['template-common']);
  gulp.watch('./app/member/admin/a/templates/**/*.html', ['template-member-admin-a']);
  gulp.watch('./styles/less/**/*.less', ['less']);
});
gulp.task('watch-member-admin-a-template', function() {
  gulp.watch('./app/common/templates/**/*.html', ['template-common']);
  gulp.watch('./app/member/admin/a/templates/**/*.html', ['template-member-admin-a']);
  gulp.watch('./styles/less/**/*.less', ['less']);
});
