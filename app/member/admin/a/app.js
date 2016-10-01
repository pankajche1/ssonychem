var underscore = angular.module('underscore',[]);
underscore.factory('_', ['$window', function($window){

  return $window._;
}]);//factory of underscore
var app = angular.module('app', ['ngRoute','ngResource','ngAnimate','TemplatesMemberAdminA', 'underscore', 'common'], 
	['$interpolateProvider',function($interpolateProvider){
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
}]);

app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/welcome',{
				templateUrl:'/member/admin/a/templates/welcome.html',controller:'WelcomeController'});
		$routeProvider.when('/products-area',{
				templateUrl:'/member/admin/a/templates/products-area.html',
                                controller:'ProductsAreaController'});
		$routeProvider.when('/products-menu',{
				templateUrl:'/member/admin/a/templates/products-menu.html',
                                controller:'ProductsMenuController'});
		$routeProvider.when('/products-edit',{
				templateUrl:'/member/admin/a/templates/products-edit.html',
                                controller:'ProductsEditController'});
		$routeProvider.when('/new-product',{
				templateUrl:'/member/admin/a/templates/new-product.html',
                                controller:'NewProductController'});
                // it is for goint to the base section of the products groups 
		$routeProvider.when('/products-groups',{
				templateUrl:'/member/admin/a/templates/products-groups-menu.html',
                                controller:'ProductsGroupsMenuController'});
		$routeProvider.when('/products-groups-edit',{
				templateUrl:'/member/admin/a/templates/products-groups-edit.html',
                                controller:'ProductsGroupsEditController'});
                /* 
		$routeProvider.when('/products-groups-edit-place',{
				templateUrl:'/member/admin/a/templates/products-group-edit-place.html',
                                controller:'ProductsGroupsEditPlaceController'});
                */
		$routeProvider.when('/new-product-group',{
				templateUrl:'/member/admin/a/templates/new-product-group.html',
                                controller:'NewProductGroupController'});
		$routeProvider.when('/employees',{
				templateUrl:'/member/admin/a/templates/employees.html',
                                controller:'EmployeesController'});
		$routeProvider.when('/members',{
				templateUrl:'/member/admin/a/templates/members.html',
                                controller:'MembersController'});
		$routeProvider.when('/settings',{
				templateUrl:'/member/admin/a/templates/settings.html',
                                controller:'SettingsController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
}]);//config 
//change here for watch
