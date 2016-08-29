'use-strict()';
module.exports=['$rootScope','$scope','$http', 'ProductsGroupsService', 
    function($rootScope,$scope, $http, productsGroupsService){
    //$scope.targetGroup = {};
    $scope.data = {'topic':'', 'group': $scope.targetGroup};
    $scope.update = function(){
        var dataToServer = {'topic':$scope.data.topic, 'group':$scope.targetGroup};
        updateProductGroup(dataToServer);

    }//update()
    function updateProductGroup(data){
        productsGroupsService.updateProductGroup(data)
                .then(function (response) {
                     $scope.isDisabled=false;
                     $scope.message = response.data.message;
               }, function (error) {
                     $scope.isDisabled=false;
                     $scope.message = "Error in saving";
        });//save data by service
    }// update product group
    $scope.cancel = function(){
        $scope.cancelEditAttributes();

    }//cancel
}];

