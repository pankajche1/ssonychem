'use-strict()';
app.directive('productsGroups', [function(){
    return{
	    restrict: 'E',
	    scope: {
		    data: '='

	    },
	    transclude: true,

	    //repeat:false,

	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/guest/templates/products-groups.html'
    };


}]);
