'use-strict()';
app.directive('navWrapper', [function(){
    return{
	    restrict: 'E',
	    scope: {


	    },
	    transclude: true,
	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/guest/templates/navbar-wrapper.html'
    };


}]);
