'use-strict()';
app.controller('ProductsGroupsSelectorController',['$rootScope','$scope','$http', '$log', '$window', '$location','ProductsGroupsService',
                function($rootScope,$scope, $http, $log, $window, $location, productsGroupsService){
    // don't define these variables here. There are to be defined in the parent controller
    //$scope.productsGroups = []
    //$scope.ajaxMessage = "";
    $scope.status ='';
    $scope.loadProductsGroups = function(){
        // use the service to do this operation:
      $scope.status = "Loading. Please wait...";
        fetchProductsGroups();
    };// loadProductsGroups()
    function fetchProductsGroups(){
        productsGroupsService.fetchProductsGroups()
        .then(function (response) {
          $scope.isDisabled=false;
          $scope.status = "";
          $scope.productsGroups = response.data;
          // and this data will be cached in the service:
          productsGroupsService.setProductsGroups(response.data);
        }, function (error) {
          $scope.status = "";
          $scope.isDisabled=false;
          $scope.message = "Error in saving";
        });//save data by service
    }// fetch product groups 
    $scope.deleteGroup = function(data){
      // ask for confirmation because it is a dangrous opearation
      var choice = $window.confirm("Are you sure?");
      var key;
      if(choice){
          // get the key of the thing that is to be deleted:
        key = $scope.productsGroups[data.index].key;
        $scope.productsGroups.splice(data.index, 1);
        var dataToServer = {'topic':'delete', 'key':key}
        deleteProductGroup(dataToServer);
      }else{
          //$log.info('no');
      }


    }// deleteGroup

    $scope.onEditClick = function(data){
      // set the product group in the service index: 
      productsGroupsService.setTargetProductsGroupIndex(data.index);
      // get the key of the thing that is to be edited:
      $scope.showEditMenu(data.index);

    }//onEditClick()

    function deleteProductGroup(data){
      $scope.status = "Please wait...";
      productsGroupsService.updateProductGroup(data)
        .then(function (response) {


          if(response.data.error == true){
            //do something the change the style of the message ex: red color
            //$scope.ajaxMessage = 'Error!';
          $scope.status = response.data.message;
          }else{
          $scope.status = '';
            updateCache();
          }//else

        }, function (error) {
          $scope.status = "Error in deleting!";
        });//delete data by service
      /*
        productsGroupsService.deleteProductGroup(index)
        .then(function (response) {
        $scope.ajaxMessage = response.data.message;
        if(response.data.error == true){
        //do something the change the style of the message ex: red color
        //$scope.ajaxMessage = 'Error!';
        }else{
        updateCache();
        }//else

        }, function (error) {
        $scope.ajaxMessage = "";
        $scope.message = "Error in deleting";
        });//save data by service
      */
    }//deleteProductGroup
    function updateCache(){
        productsGroupsService.setProductsGroups(angular.copy($scope.productsGroups));
    }
    $scope.loadProductsGroups();
}]

);
