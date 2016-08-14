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
		$routeProvider.when('/products',{
				templateUrl:'/admin/a/products.html',
                                controller:'ProductsController'});
		$routeProvider.when('/emplopyees',{
				templateUrl:'/admin/a/employees.html',
                                controller:'EmployeesController'});
		$routeProvider.when('/settings',{
				templateUrl:'/admin/a/settings.html',
                                controller:'SettingsController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
}]);//config 
//change here for watch
