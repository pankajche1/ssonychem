'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    scope: {
		    items: '='

	    },
	    transclude: true,
	    controller:['$scope','$element',function($scope, $element){

            }],
	    //repeat:false,

	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/guest/nav.html'
    };


}];
	
