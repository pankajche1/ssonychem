'use strict()';
app.controller('ProductsGroupsController', 
               ['$rootScope','$scope','$http','ProductsGroupsService',
                function($rootScope,$scope, $http, productsGroupsService){
                  $scope.data = {'message':'', 'groups':[]};
                  $scope.data.message="";
                  $scope.fetchProductsGroups = function(){
                    $scope.data.message = "Loading. Please wait...";
                    fetchProductsGroupsFromService();
                  };//function fetchProducts()
                  function fetchProductsGroupsFromService(){
                    productsGroupsService.fetchProductsGroups()
                      .then(function (response) {
                        $scope.data.message = "";
                        $scope.data.groups = response.data;
                        // also get the prev and next cursors TODO
                      }, function (error) {
                        $scope.data.message = "Error in loading!";
                      });//save data by service
                  }// fetch products
                  $scope.fetchProductsGroups();


                }]);
