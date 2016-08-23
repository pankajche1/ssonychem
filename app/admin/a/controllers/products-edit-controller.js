'use-strict()';
module.exports=['$rootScope','$scope','$http', '$log', '$window', 'ProductsService',
           function($rootScope,$scope, $http, $log, $window, productsService){
    $scope.products = [];
    $scope.getProducts = function(){
        $scope.isDisabled=true;
        $scope.ajaxMessage = "Loading. Please wait";
        fetchProducts();
    }
    function fetchProducts(){
        productsService.getProducts()
                .then(function (response) {
                     $scope.isDisabled=false;
                     $scope.ajaxMessage = "";
                     $scope.products = response.data.objects;
                     // also get the prev and next cursors TODO
                     // and this data will be cached in the service:
                     productsService.setProducts(response.data);
               }, function (error) {
                     $scope.ajaxMessage = "";
                     $scope.isDisabled=false;
                     $scope.message = "Error in loading!";
        });//save data by service
    }// fetch product groups 
    // downloading the products from server when the controller is created:
    $scope.getProducts();
}];

