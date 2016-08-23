'use-strict()';
module.exports= [function(){
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


}];
	
