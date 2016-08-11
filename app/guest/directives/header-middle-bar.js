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
	    templateUrl:'/guest/header-middle-bar.html'
    };


}];
	
