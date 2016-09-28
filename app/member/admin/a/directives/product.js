'use-strict()';
app.directive('product', [function(){
    return{
	    restrict: 'E',
	    scope: {
		    product: '=data',
                    delete:'&',
                    edit:'&'

	    },
	    transclude: true,
	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/admin/a/product.html'
    };


}]
	
);
