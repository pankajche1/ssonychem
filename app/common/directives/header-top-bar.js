'use-strict()';
common.directive('headertopbar', [function(){
  return{
    restrict: 'E',
    scope: {
      data: '='
    },
    transclude: true,

    //repeat:false,

    link: function ($scope, element, attrs) {

    },
    templateUrl:'/common/templates/header-top-bar.html'
  };


}]);

