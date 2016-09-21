module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '',
                //logLevel: 'config.LOG_DEBUG',
		frameworks: ['jasmine'],
		files: [
            'public/js/lib-1609181239.js',
            //'public/js/main-admin-a.js',
            //'public/js/main-admin-b.js',
                  'app/guest/templates/alltemplate.js',
                  'app/guest/app.js',
                  'app/guest/services/*.js',
                  'app/guest/directives/*.js',
                  'app/guest/controllers/*.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'tests/js/utils/utils.js',
            //'tests/js/unit/**/*.js',
                'tests/js/unit/guest/**/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['PhantomJS']
	});
};
