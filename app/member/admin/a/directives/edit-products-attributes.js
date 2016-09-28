'use-strict()';
app.directive('editProductAttributes', [function(){
  return{
    restrict: 'E',
    scope: {
      data:'=data',
      submit:'&',
      cancel:'&'

    },
    transclude: true,
    link: function ($scope, element, attrs) {

    },
    templateUrl:'/admin/a/edit-products-attributes.html'
  };


}]

);
