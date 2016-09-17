'use-strict()';
module.exports=['$rootScope','$scope','$http', '$log', 'ProductsService',
                function($rootScope,$scope, $http,$log, productsService){
  $scope.tempProducts = [];
  $scope.data = {'message':'', 'products':[]};
  $scope.fetchProducts = function(){
    $scope.isDisabled=true;
    $scope.message = "Loading. Please wait";
    fetchProductsFromService();
  };//function fetchProducts()
  function fetchProductsFromService(){
    productsService.fetchProducts()
      .then(function (response) {
        $scope.isDisabled=false;
        $scope.message = "";
        $scope.products = response.data.objects;
        // also get the prev and next cursors TODO
        // and this data will be cached in the service:
        productsService.setProducts(response.data.objects);
        // for display in the ui we should have some manipulated list:
        prepareProductsList(response.data.objects);
      }, function (error) {
        $scope.isDisabled=false;
        $scope.message = "Error in loading!";
      });//save data by service
  }// fetch product groups 
  $scope.cancel = function(){
    $scope.onSelectProductsCancel();
  };
  $scope.ok = function(){
    //call the parent function:


    var selectedProducts = [];
    for(i=0;i<$scope.data.products.length;i++){
      var product = $scope.data.products[i];
      if(product.isSelected==true){
        selectedProducts.push({'name':product.name, 'key':product.key});
        }

      };//for
    $scope.onSelectProductsDone(selectedProducts);
  };
  // prepare a temporary products list for models to the ui for products selection:
  function prepareProductsList(products){
    $scope.tempProducts = []; // a new list
    for(i=0;i<products.length;i++){
      item = {'name':products[i].name,'key':products[i].key,'isSelected':false};
      $scope.tempProducts.push(item);
      };//for
    if(products.length>0) $scope.data.message = '';
    else $scope.data.message = 'No Products to display';
    // data:
    $scope.data.products = $scope.tempProducts;
   
    };//prepareProductsList
  $scope.fetchProducts();
}];

