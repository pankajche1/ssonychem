'use-strict()';
module.exports=['$rootScope','$scope','$http', 'ProductsGroupsService',
           function($rootScope,$scope, $http, productsGroupsService){
    // for save a new product group use the service:
    $scope.projectGroup = {};
    $scope.info = 'pankaj';
    $scope.saveProductGroup = function(){
    productsGroupsService.saveProductGroup($scope.projectGroup)
                .then(function (response) {

               }, function (error) {
                     console.log('error in getting data from http');
        });//save data
    }// save product group new
}];

