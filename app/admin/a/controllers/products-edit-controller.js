'use-strict()';
module.exports=['$rootScope','$scope','$http', '$log', '$window', 'ProductsService',
           function($rootScope,$scope, $http, $log, $window, productsService){
    $scope.products = [];
    $scope.getProducts = function(){
        $scope.isDisabled=true;
        $scope.ajaxMessage = "Loading. Please wait";
        fetchProducts();
    }
    function fetchProducts(){
        productsService.getProducts()
                .then(function (response) {
                     $scope.isDisabled=false;
                     $scope.ajaxMessage = "";
                     $scope.products = response.data.objects;
                     // also get the prev and next cursors TODO
                     // and this data will be cached in the service:
                     productsService.setProducts(response.data);
               }, function (error) {
                     $scope.ajaxMessage = "";
                     $scope.isDisabled=false;
                     $scope.message = "Error in loading!";
        });//save data by service
    }// fetch product groups 
    $scope.onDeleteClick = function(data){
      // ask for confirmation because it is a dangrous opearation
      // TODO: learn how to use $window for unit test. For now i am commenting this out
      //$log.info("index="+data.index);
      var choice = $window.confirm("Are you sure?");
      var key;
      if(choice){
          // get the key of the thing that is to be deleted:
          key = $scope.products[data.index].key;
          $scope.products.splice(data.index, 1);
          deleteProduct(key);
      }else{
          //$log.info('no');
      }

    }//onDeleteClick()
    $scope.onEditClick = function(data){

    }//onDeleteClick()
    function deleteProduct(key){
        productsService.deleteProduct(key)
                .then(function (response) {
                     $scope.isDisabled=false;
                     $scope.ajaxMessage = response.data.message;
                     //$scope.productsGroups = response.data;
                     if(response.data.error == true){
                         //do something the change the style of the message ex: red color
                         //$scope.ajaxMessage = 'Error!';
                     }else{
                         updateCache();
                     }//else

               }, function (error) {
                     $scope.ajaxMessage = "";
                     $scope.isDisabled=false;
                     $scope.message = "Error in deleting";
        });//save data by service

    }//deleteProductGroup
    function updateCache(){
        productsService.setProducts(angular.copy($scope.products));

    }
    // downloading the products from server when the controller is created:
    $scope.getProducts();
}];

