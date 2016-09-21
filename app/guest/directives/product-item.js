'use-strict()';
app.directive('productItem', [function(){
    return{
	    restrict: 'E',
	    scope: {
		    product: '='

	    },
	    transclude: true,
	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/guest/product-item.html'
    };


}]);
