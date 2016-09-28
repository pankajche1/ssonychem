'use-strict()';
app.controller('ProductsController', 
               ['$rootScope','$scope','$http','ProductsService',
                function($rootScope,$scope, $http, productsService){

                  $scope.message="";
                  $scope.fetchProducts = function(){
                    $scope.message = "Loading. Please wait...";
                    fetchProductsFromService();
                  };//function fetchProducts()
                  function fetchProductsFromService(){
                    productsService.fetchProducts()
                      .then(function (response) {
                        $scope.message = "";
                        $scope.products = response.data.objects;
                        // also get the prev and next cursors TODO
                      }, function (error) {
                        $scope.message = "Error in loading!";
                      });//save data by service
                  }// fetch products
                  $scope.fetchProducts();

                }]);


