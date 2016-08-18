'use-strict()';
module.exports=['$rootScope','$scope','$http', '$log', '$window', 'ProductsGroupsService',
           function($rootScope,$scope, $http, $log, $window, productsGroupsService){
    $scope.productsGroups = []
    $scope.ajaxMessage = "";
    $scope.getProductsGroups = function(){
        $scope.isDisabled=true;
        $scope.ajaxMessage = "Loading. Please wait";
        fetchProductsGroups();
    }
    function fetchProductsGroups(){
        productsGroupsService.getProductsGroups()
                .then(function (response) {
                     $scope.isDisabled=false;
                     $scope.ajaxMessage = "";
                     $scope.productsGroups = response.data;
               }, function (error) {
                     $scope.ajaxMessage = "";
                     $scope.isDisabled=false;
                     $scope.message = "Error in saving";
        });//save data by service
    }// fetch product groups 
    function processProductsGroups(data){
        $scope.productsGroups = data;

    }//processProductsGroups
    $scope.onDeleteClick = function(index){
      choice = $window.confirm("Are you sure?");
      if(choice){
          $log.info('yes');
      }else{
          $log.info('no');
      }

    }//onDeleteClick()
    $scope.onEditClick = function(index){
      $log.info(index);
    }//onDeleteClick()
    //load products groups
    $scope.getProductsGroups();
}];

