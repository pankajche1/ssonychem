var app = angular.module('app', ['ngRoute','ngResource','ngAnimate',/*'TemplatesCommon'*/ 'common','TemplatesMemberGeneral'], 
	['$interpolateProvider',function($interpolateProvider){
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
}]);
app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/welcome',{
				templateUrl:'/member/general/templates/welcome.html',controller:'WelcomeController'});
		$routeProvider.when('/products',{
				templateUrl:'/member/general/templates/products.html',
                                controller:'ProductsGroupsController'});
  		$routeProvider.when('/products-group/:key',{
				templateUrl:'/member/general/templates/products-group.html',
                                controller:'ProductsGroupController'});
		$routeProvider.when('/contact-us',{
				templateUrl:'/member/general/templates/contact-us.html',
                                controller:'ContactUsController'});
		$routeProvider.when('/about-us',{
				templateUrl:'/member/general/templates/about-us.html',
                                controller:'AboutUsController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
}]);//config 
//change here for watch

