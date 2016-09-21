'use-strict()';
app.directive('headerMiddleBar', [function(){
    return{
	    restrict: 'E',
	    scope: {
		    items: '='

	    },
	    transclude: true,

	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/guest/header-middle-bar.html'
    };


}]);
	
