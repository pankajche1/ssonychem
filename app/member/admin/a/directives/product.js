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
	    templateUrl:'/member/admin/a/templates/product.html'
    };


}]
	
);
