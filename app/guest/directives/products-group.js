'use-strict()';
app.directive('productsGroup', [function(){
    return{
	    restrict: 'E',
	    scope: {
		    data: '='

	    },
	    transclude: true,

	    //repeat:false,

	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/guest/templates/products-group.html'
    };


}]);
