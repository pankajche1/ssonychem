'use-strict()';
common.directive('headerMiddleBar', [function(){
    return{
	    restrict: 'E',
	    scope: {
		    items: '='

	    },
	    transclude: true,

	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/common/templates/header-middle-bar.html'
    };


}]);
	
