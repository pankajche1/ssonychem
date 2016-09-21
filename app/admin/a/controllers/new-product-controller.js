'use-strict()';
module.exports=['$rootScope','$scope', 'ProductsService',
                function($rootScope,$scope, productsService){
                  var master={};
                  var ajaxMsg = "Saving. Please wait ...";
                  // for save a new product group use the service:
                  $scope.product = {};
                  function saveProduct(data){
                    productsService.saveProduct(data)
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
                    // prepare data for server:
                    var dataToServer = {'topic':'new', 'product':$scope.product}
                    saveProduct(dataToServer);
                  };//submit()
                }];//function parent








