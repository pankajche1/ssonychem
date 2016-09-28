'use-strict()';
app.directive('navWrapper', [function(){
    return{
	    restrict: 'E',
	    scope: {


	    },
	    transclude: true,
	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/member/admin/a/templates/nav-wrapper.html'
    };


}]);
