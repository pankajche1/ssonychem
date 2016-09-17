require('./templates');
var underscore = angular.module('underscore',[]);
underscore.factory('_', ['$window', function($window){

  return $window._;
}]);//factory of underscore
var app = angular.module('app', ['ngRoute','ngResource','ngAnimate','TemplatesAdminA', 'underscore'], 
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
		$routeProvider.when('/products-area',{
				templateUrl:'/admin/a/products-area.html',
                                controller:'ProductsAreaController'});
		$routeProvider.when('/products-menu',{
				templateUrl:'/admin/a/products-menu.html',
                                controller:'ProductsMenuController'});
		$routeProvider.when('/products-edit',{
				templateUrl:'/admin/a/products-edit.html',
                                controller:'ProductsEditController'});
		$routeProvider.when('/new-product',{
				templateUrl:'/admin/a/new-product.html',
                                controller:'NewProductController'});
                // it is for goint to the base section of the products groups 
		$routeProvider.when('/products-groups',{
				templateUrl:'/admin/a/products-groups-menu.html',
                                controller:'ProductsGroupsMenuController'});
		$routeProvider.when('/products-groups-edit',{
				templateUrl:'/admin/a/products-groups-edit.html',
                                controller:'ProductsGroupsEditController'});
                /* 
		$routeProvider.when('/products-groups-edit-place',{
				templateUrl:'/admin/a/products-group-edit-place.html',
                                controller:'ProductsGroupsEditPlaceController'});
                */
		$routeProvider.when('/new-product-group',{
				templateUrl:'/admin/a/new-product-group.html',
                                controller:'NewProductGroupController'});
		$routeProvider.when('/employees',{
				templateUrl:'/admin/a/employees.html',
                                controller:'EmployeesController'});
		$routeProvider.when('/settings',{
				templateUrl:'/admin/a/settings.html',
                                controller:'SettingsController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
}]);//config 
//change here for watch
