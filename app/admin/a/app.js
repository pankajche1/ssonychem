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
                // it is for goint to the base section of the products groups 
		$routeProvider.when('/products-groups',{
				templateUrl:'/admin/a/products-groups-menu.html',
                                controller:'ProductsGroupsMenuController'});
		$routeProvider.when('/products-groups-edit',{
				templateUrl:'/admin/a/products-groups-edit.html',
                                controller:'ProductsGroupsEditController'});
		$routeProvider.when('/new-product-group',{
				templateUrl:'/admin/a/new-product-group.html',
                                controller:'NewProductGroupController'});
		$routeProvider.when('/emplopyees',{
				templateUrl:'/admin/a/employees.html',
                                controller:'EmployeesController'});
		$routeProvider.when('/settings',{
				templateUrl:'/admin/a/settings.html',
                                controller:'SettingsController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
}]);//config 
//change here for watch
