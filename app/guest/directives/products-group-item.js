'use-strict()';
app.directive('productsGroupItem', [function(){
    return{
	    restrict: 'E',
	    scope: {
		    group: '='

	    },
	    transclude: true,
	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/guest/templates/products-group-item.html'
    };


}]);
