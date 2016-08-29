'use-strict()';
module.exports=['$rootScope','$scope','$http', '$log', '$window', 'ProductsGroupsService',
           function($rootScope,$scope, $http, $log, $window, productsGroupsService){
    $scope.isEditAttributes = false;
    $scope.isAddProducts = false;
    $scope.editAttributes = function(){
        $scope.isEditAttributes = true;
        $scope.isAddProducts = false;
    }
    $scope.addProducts = function(){
        $scope.isEditAttributes = false;
        $scope.isAddProducts = true;


    }
}];

