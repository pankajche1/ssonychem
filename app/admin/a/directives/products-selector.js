'use-strict()';
module.exports= [function(){
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
    templateUrl:'/admin/a/products-selector.html'
  };


}];

