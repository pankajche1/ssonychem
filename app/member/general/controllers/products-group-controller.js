'use strict()';
app.controller('ProductsGroupController',
               ['$rootScope','$scope','ProductsGroupsService', '$routeParams',
                function($rootScope,$scope, productsService, $routeParams){
                  $scope.params = $routeParams;
                  $scope.keyGroup = $scope.params.key;
                  $scope.data = {'message':'', 'group':{}};
                  $scope.fetchGroupDetails = function(){
                    $scope.data.message = "Loading. Please wait...";
                    fetchGroupDetailsFromService($scope.keyGroup);
                  };//function fetchProducts()
                  function fetchGroupDetailsFromService(key){
                    productsService.fetchGroupDetails(key)
                      .then(function (response) {
                        $scope.data.message = "";
                        $scope.data.group = response.data;
                        // also get the prev and next cursors TODO
                      }, function (error) {
                        $scope.data.message = "Error in loading!";
                      });//save data by service
                  }// fetch products
                  $scope.fetchGroupDetails();

                }]);


