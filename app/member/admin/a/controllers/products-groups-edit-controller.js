'use-strict()';
app.controller('ProductsGroupsEditController',['$rootScope','$scope','$http', '$log', '$window', '$location','ProductsGroupsService',
    function($rootScope,$scope, $http, $log, $window, $location, productsGroupsService){
      // these are some variables that will be used by the child controllers and not
      // not to be defined there
      $scope.productsGroups = [];
      $scope.targetProductsGroup = null;
      $scope.ajaxMessage = "";
      $scope.info1 = "Sunny Kailash Dagar";
      $scope.isMenuShow = true;
      $scope.isEditShow = false;        
      $scope.isEditAttributesShow = false;        
      $scope.isAddProductsShow = false;        
      $scope.testData1 = [];
      $scope.testData2 = [];
      $scope.showGroupsData = function(){
        $log.info('PrdtsGrpsEditCtrl groups.length:'+$scope.productsGroups.length);


        }// show groups data
      $scope.showTestData = function(){
        $log.info('PrdtsGrpsEditCtrl testData1.length:'+$scope.testData1.length);        
        $log.info('PrdtsGrpsEditCtrl testData2.length:'+$scope.testData2.length);        
        }
      
/*
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
                     // and this data will be cached in the service:
                     productsGroupsService.setProductsGroups(response.data);
               }, function (error) {
                     $scope.ajaxMessage = "";
                     $scope.isDisabled=false;
                     $scope.message = "Error in saving";
        });//save data by service
    }// fetch product groups 
    function processProductsGroups(data){
        $scope.productsGroups = data;

    }//processProductsGroups
*/
/*
    $scope.onDeleteClick = function(data){
      // ask for confirmation because it is a dangrous opearation
      // TODO: learn how to use $window for unit test. For now i am commenting this out
      //$log.info("index="+data.index);
      var choice = $window.confirm("Are you sure?");
      var key;
      if(choice){
          // get the key of the thing that is to be deleted:
          key = $scope.productsGroups[data.index].key;
          $scope.productsGroups.splice(data.index, 1);
          deleteProductGroup(key);
      }else{
          //$log.info('no');
      }

    }//onDeleteClick()
*/

    $scope.showEditMenu = function(index){

      // get the target group that is to be edited:
      $scope.targetProductsGroup = productsGroupsService.getTargetProductsGroup();
      // now show the menu for a group in the DOM:
      $scope.isMenuShow = false;        
      $scope.isEditShow = true;        
      $scope.isEditAttributesShow = false;        
      $scope.isAddProductsShow = false;        

    }//showEditMenu()
    $scope.cancelEditPlace = function(data){
        $scope.isMenuShow = true;        
        $scope.isEditShow = false;        
        $scope.isEditAttributesShow = false;        
        $scope.isAddProductsShow = false;        

    }//onDeleteClick()
    $scope.cancelEditAttributes = function(data){
        $scope.isMenuShow = false;        
        $scope.isEditShow = true;        
        $scope.isEditAttributesShow = false;        
        $scope.isAddProductsShow = false;        

    }//onDeleteClick()
    $scope.onEditAttributesClick = function(){
        $scope.isMenuShow = false;        
        $scope.isEditShow = false;        
        $scope.isEditAttributesShow = true;        
        $scope.isAddProductsShow = false;        

    }//onEditAttributesClick
    $scope.onAddProductsClick = function(){
        $scope.isMenuShow = false;        
        $scope.isEditShow = false;        
        $scope.isEditAttributesShow = false;        
        $scope.isAddProductsShow = true;        


    }//onAddProductsClick
    $scope.cancelAddProducts = function(data){
        $scope.isMenuShow = false;        
        $scope.isEditShow = true;        
        $scope.isEditAttributesShow = false;        
        $scope.isAddProductsShow = false;        

    }//onDeleteClick()
   /*
    function gotoEditPage(path) {
        $location.path(path);
    };
*/
/*
    function deleteProductGroup(index){
        productsGroupsService.deleteProductGroup(index)
                .then(function (response) {
                     $scope.isDisabled=false;
                     $scope.ajaxMessage = response.data.message;
                     //$scope.productsGroups = response.data;
                     if(response.data.error == true){
                         //do something the change the style of the message ex: red color
                         //$scope.ajaxMessage = 'Error!';
                     }else{
                         updateCache();
                     }//else

               }, function (error) {
                     $scope.ajaxMessage = "";
                     $scope.isDisabled=false;
                     $scope.message = "Error in deleting";
        });//save data by service

    }//deleteProductGroup function updateCache(){
        productsGroupsService.setProductsGroups(angular.copy($scope.productsGroups));

		            

    }
*/
    //load products groups
    //$scope.getProductsGroups();
}]

);
