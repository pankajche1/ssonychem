'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    scope: {
		    productsGroup: '=data',
                    delete:'&',
                    edit:'&'

	    },
	    transclude: true,
	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/admin/a/products-group.html'
    };


}];
	
