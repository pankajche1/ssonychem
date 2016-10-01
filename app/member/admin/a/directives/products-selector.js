'use-strict()';
app.directive('productsSelector', [function(){
  return{
    restrict: 'E',
    scope: {
      data: '=data',
      ok:'&',
      cancel:'&',
      loadProducts:'&'

    },
    transclude: true,
    link: function ($scope, element, attrs) {

    },
    templateUrl:'/member/admin/a/templates/products-selector.html'
  };


}]

);
