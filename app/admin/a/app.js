require('./templates');
var app = angular.module('app', ['ngRoute','ngResource','ngAnimate','TemplatesAdminA'], 
	['$interpolateProvider',function($interpolateProvider){
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
}]);
require('./services');
require('./controllers');
require('./directives');
app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/welcome',{
				templateUrl:'/admin/a/welcome.html',controller:'WelcomeController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
}]);//config 
//change here for watch
