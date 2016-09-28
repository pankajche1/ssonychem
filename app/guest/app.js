var app = angular.module('app', ['ngRoute','ngResource','ngAnimate','common', 'TemplatesGuest'], 
	['$interpolateProvider',function($interpolateProvider){
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
}]);
app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/welcome',{
				templateUrl:'/guest/templates/welcome.html',controller:'WelcomeController'});
		$routeProvider.when('/products',{
				templateUrl:'/guest/templates/products.html',
                                controller:'ProductsGroupsController'});
  		$routeProvider.when('/products-group/:key',{
				templateUrl:'/guest/templates/products-group.html',
                                controller:'ProductsGroupController'});
		$routeProvider.when('/contact-us',{
				templateUrl:'/guest/templates/contact-us.html',
                                controller:'ContactUsController'});
		$routeProvider.when('/about-us',{
				templateUrl:'/guest/templates/about-us.html',
                                controller:'AboutUsController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
}]);//config 
//change here for watch
