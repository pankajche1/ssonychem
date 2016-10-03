'use-strict()';
common.directive('pNavItem', [function(){
  return{
    restrict: 'E',
    require: "^pnav",
    scope: {
      label: '@',
      page: '@',
      ismobile:'@',
      data:'='
    },
    controller:function($scope, $element){

    },
    link: function ($scope, element, attrs, navController) {
      
      navController.addItem($scope);
    },
    template:
    //'<li><a href="#" ng-click="select(id)" ng-class={selected:selected}>{{ label }}</a></li>' // div main
    '<div></div>' // div main
  };
}]);

