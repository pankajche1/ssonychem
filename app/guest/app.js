//require('angular');
//require('angular-route');
//require('angular-animate');
//require('angular-resource');

require('./templates');
//require('../common/templates');

var app = angular.module('app', ['ngRoute','ngResource','ngAnimate','TemplatesGuest'], 
	['$interpolateProvider',function($interpolateProvider){
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
}]);
//console.log('came here2');
//controllers:
require('./services');
require('./controllers');
require('./directives');
//require('../common/directives');
app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/welcome',{
				templateUrl:'/guest/welcome.html',controller:'WelcomeController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
}]);//config 
//change here for watch
