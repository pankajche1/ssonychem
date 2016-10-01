module.exports = function (config) {
  'use strict';

  config.set({
    basePath: '',
    //logLevel: 'config.LOG_DEBUG',
    frameworks: ['jasmine'],
    files: [
      //common library files:
      "./node_modules/underscore/underscore.js"
      ,"./node_modules/angular/angular.js"
      ,"./node_modules/angular-route/angular-route.js"
      ,"./node_modules/angular-animate/angular-animate.js"
      ,"./node_modules/angular-resource/angular-resource.js"
      //,'public/js/lib-1609181239.js',
      // common app templates files:
      ,'app/common/templates/templates-common.js'
      // common directives, services etc:
      ,'app/common/app.js'
      ,'app/common/directives/*.js'
      //,'app/common/controllers/*.js'
      //,'app/common/services/*.js'
      //'public/js/main-admin-a.js',
      //'public/js/main-admin-b.js',
      // guest section:
      //,'app/guest/templates/guest-templates.js'
      //,'app/guest/app.js'
      //,'app/guest/services/*.js'
      //,'app/guest/directives/*.js'
      //,'app/guest/controllers/*.js'
      // member general section:
      //,'app/member/general/templates/member-general-templates.js'
      //,'app/member/general/app.js'
      //,'app/member/general/services/*.js'
      //,'app/member/general/directives/*.js'
      //,'app/member/general/controllers/*.js'
      // member admin a section:
      ,'app/member/admin/a/templates/member-admin-a-templates.js'
      ,'app/member/admin/a/app.js'
      ,'app/member/admin/a/services/*.js'
      ,'app/member/admin/a/directives/*.js'
      ,'app/member/admin/a/controllers/*.js'

      // angular libs etc:
      ,'node_modules/angular-mocks/angular-mocks.js'
      // test files:
      ,'tests/js/utils/utils.js'
      // test app files:
      //1 common section:
      //,'tests/js/unit/common/**/*.js'
      //2 guest section
      //,'tests/js/unit/guest/**/*.js'
      //3 member general section:
      //,'tests/js/unit/member/general/**/*.js'
      //4 member admin a:
      ,'tests/js/unit/member/admin/a/**/*.js'
    ],
    autoWatch: true,
    singleRun: false,
    browsers: ['PhantomJS']
  });
};
