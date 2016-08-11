'use strict()';
var app = angular.module('app');
app.directive('topHeader', require('./header.js'));//direcitve
app.directive('pnav', require('./nav.js'));//direcitve
app.directive('headertopbar', require('./header-top-bar.js'));
app.directive('headerMiddleBar', require('./header-middle-bar.js'));


