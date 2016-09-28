'use-strict()';
app.controller('ProductsEditController',['$rootScope','$scope','$http', '$log', '$window', 'ProductsService',
                function($rootScope,$scope, $http, $log, $window, productsService){
                  $scope.products = [];
                  $scope.isSelectorShow = true;
                  $scope.isEditShow = false;
                  $scope.message = '';
                  $scope.targetProduct = null;
                  $scope.data = {'topic':'update', 'product':{}};
                  
                  $scope.cancel = function(){
                    $scope.isSelectorShow = true;
                    $scope.isEditShow = false;
                    
                  };//onEditAttributeClick
                  
                  $scope.getProducts = function(){
                    $scope.isDisabled=true;
                    $scope.message = "Loading. Please wait...";
                    fetchProducts();
                  }
                  function fetchProducts(){
                    productsService.fetchProducts()
                      .then(function (response) {
                        $scope.isDisabled=false;
                        $scope.message = "";
                        $scope.products = response.data.objects;
                        // also get the prev and next cursors TODO
                        // and this data will be cached in the service:
                        productsService.setProducts(response.data);
                      }, function (error) {
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
                      deleteProduct({'topic':'delete', 'key':key});
                    }else{
                      //$log.info('no');
                    }

                  }//onDeleteClick()
                  $scope.onEditClick = function(data){
                    if($scope.products.length > data.index){
                      $scope.targetProduct = $scope.products[data.index];
                      $scope.data.product = $scope.targetProduct;
                      $scope.isSelectorShow = false;
                      $scope.isEditShow = true;
                    }

                  }//onDeleteClick()
                  function deleteProduct(data){
                    
                    productsService.updateProduct(data)
                      .then(function (response) {
                        $scope.isDisabled=false;
                        $scope.message = response.data.message;
                        if(response.data.error == true){
                          //do something the change the style of the message ex: red color
                          //$scope.ajaxMessage = 'Error!';
                        }else{
                          updateCache();
                        }//else

                      }, function (error) {
                        $scope.isDisabled=false;
                        $scope.message = "Error in deleting";
                      });//save data by service
                    /*
                    productsService.deleteProduct(key)
                      .then(function (response) {
                        $scope.isDisabled=false;
                        $scope.message = response.data.message;
                        //$scope.productsGroups = response.data;
                        if(response.data.error == true){
                          //do something the change the style of the message ex: red color
                          //$scope.ajaxMessage = 'Error!';
                        }else{
                          updateCache();
                        }//else

                      }, function (error) {
                        $scope.isDisabled=false;
                        $scope.message = "Error in deleting";
                      });//save data by service
                    */
                  }//deleteProductGroup
                  function updateCache(){
                    productsService.setProducts(angular.copy($scope.products));

                  }
                  $scope.update = function(){
                    $scope.data.message = "Please wait. Updating...";
                    var dataToServer = {'topic': 'update', 'product':$scope.data.product};
                    updateProduct(dataToServer);

                  }//update()
                  function updateProduct(data){

                    productsService.updateProduct(data)
                      .then(function (response) {
                        $scope.isDisabled=false;
                        $scope.data.message = response.data.message;
                      }, function (error) {
                        $scope.isDisabled=false;
                        $scope.data.message = "Error in saving";
                      });//save data by service
                  }// update product 

                  // downloading the products from server when the controller is created:
                  $scope.getProducts();
                }]

);
