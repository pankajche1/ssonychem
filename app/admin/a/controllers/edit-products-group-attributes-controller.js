'use-strict()';
module.exports=['$rootScope','$scope','$http', 'ProductsGroupsService', 
    function($rootScope,$scope, $http, productsGroupsService){
    $scope.topic = 'update';
    $scope.data = {'topic':'update', 'group': $scope.targetProductsGroup, 'message':''};
    $scope.update = function(){
      $scope.data.message = "Please wait. Updating...";
        var dataToServer = {'topic':$scope.data.topic, 'group':$scope.data.group};
        updateProductGroup(dataToServer);

    }//update()
    function updateProductGroup(data){
        productsGroupsService.updateProductGroup(data)
                .then(function (response) {
                  $scope.isDisabled=false;
                  $scope.data.message = response.data.message;
               }, function (error) {
                     $scope.isDisabled=false;
                     $scope.data.message = "Error in saving";
        });//save data by service
    }// update product group
    $scope.cancel = function(){
        $scope.cancelEditAttributes();

    }//cancel
}];

