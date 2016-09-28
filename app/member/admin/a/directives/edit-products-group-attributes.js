'use-strict()';
app.directive('editProductsGroupAttributes', [function(){
  return{
    restrict: 'E',
    scope: {
      data: '=data',
      update:'&',
      submit:'&update',
      cancel:'&'

    },
    transclude: true,
    link: function ($scope, element, attrs) {

    },
    templateUrl:'/admin/a/edit-products-group-attributes.html'
  };


}]

);
