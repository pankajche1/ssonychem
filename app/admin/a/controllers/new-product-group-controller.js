'use-strict()';
module.exports=['$rootScope','$scope', 'ProductsGroupsService', '$log',
           function($rootScope,$scope, productsGroupsService, $log){
    var master={};
    var ajaxMsg = "Saving. Please wait ...";
    // for save a new product group use the service:
    $scope.productGroup = {};
    function saveProductGroup(){
        productsGroupsService.saveProductGroup($scope.productGroup)
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
	master=angular.copy($scope.productGroup);
	saveProductGroup();
    };//submit()
}];

