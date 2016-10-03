'use-strict()';
app.directive('navWrapper', [function(){
    return{
	    restrict: 'E',
	    scope: {


	    },
	    transclude: true,
	    link: function ($scope, element, attrs) {
              $scope.user={'nickname':user.nickname,'logoutUrl':user.logoutUrl};
	    },
	    templateUrl:'/member/general/templates/nav-wrapper.html'
    };


}]);
