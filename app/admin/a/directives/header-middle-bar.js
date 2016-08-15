'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    scope: {
		    items: '='

	    },
	    transclude: true,
	    //repeat:false,

	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/admin/a/header-middle-bar.html'
    };


}];
	
