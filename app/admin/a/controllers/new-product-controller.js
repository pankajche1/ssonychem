'use-strict()';
module.exports=['$rootScope','$scope', 'ProductsService', function($rootScope,$scope, productsService){
    var master={};
    var ajaxMsg = "Saving. Please wait ...";
    // for save a new product group use the service:
    $scope.product = {};
    function saveProduct(){
        productsService.saveProduct($scope.product)
                .then(function (response) {
                     $scope.isDisabled=false;
                     $scope.message = response.data.message;
               }, function (error) {
                     $scope.isDisabled=false;
                     $scope.message = "Error in saving";
        });//save data by service
    }// save product group new
    // resetting the form:
    $scope.reset=function(form){
        $scope.message = "";
	if(form){
            form.$setPristine();
	    form.$setUntouched();
	}
    };//reset
    $scope.submit=function(){
        $scope.isDisabled=true;
        $scope.message = ajaxMsg;
	master=angular.copy($scope.product);
	saveProduct();
    };//submit()
}];

