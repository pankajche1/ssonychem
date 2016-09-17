'use-strict()';
module.exports=['$scope','$http','$log', '$window','ProductsGroupsService','_',
                function($scope, $http, $log, $window, productsGroupsService, _){
                  
                  /** it gets 'targetProductsGroup' object from the parent $scope
                      and its info this ctrl will use to download the selected group data
                      and it will display this info on the dashboard
                  **/
                  var selectedProducts = [];
                  var strMsgRmPrdConfirm = "Do you want to remove this product"
                    +" from the list?\n product will now be delected from the server.";
                  // $scope.targetProductsGroup is the selected group which is set by the group selector controller. we have to just use it
                  $scope.isDashboardShow = true;
                  $scope.isSelectorShow = false;
                  $scope.productsGroupDetails = {'products':[]};// just for default when no download
                  $scope.loadProductsGroup = function(){
                    // use the service to do this operation:
                    fetchProductsGroup($scope.targetProductsGroup.key);//this is set by the parent controller
                  };// loadProductsGroups()

                  function fetchProductsGroup(key){
                    productsGroupsService.fetchProductsGroupByKey(key)
                      .then(function (response) {
                        $log.info('i have come here');
                        $scope.ajaxMessage = "";
                        $scope.productsGroupDetails = response.data;

                        $scope.selectedProducts = response.data.products;
                        // and this data will be cached in the service:
                        //productsGroupsService.setProductsGroups(response.data);
                      }, function (error) {
                        $scope.ajaxMessage = "";
                        $scope.message = "Error in downloading the desired products group.";
                      });//save data by service
                  }// fetch product groups 

                  $scope.showProductsSelector = function(){
                    $scope.isDashboardShow = false;
                    $scope.isSelectorShow = true;
                  };
                  $scope.onSelectProductsDone = function(selectedProductsIn){
                    $log.info(_.isUndefined($scope.selectedProducts));
                    _.each(selectedProductsIn, function(value, key){
                      console.log("key:"+key+", value:"+JSON.stringify(value));

                    });//_each

                    selectedProducts = selectedProductsIn;
                    $scope.isDashboardShow = true;
                    $scope.isSelectorShow = false;
                    // see if some duplicate products are present in the list incoming:
                    var curProducts = $scope.selectedProducts;
                    var tempProducts = [];
                    /*
                    //console.log(selectedProducts);
                    _.each(selectedProducts, function(value, key){
                      console.log("key:"+key+", value:"+JSON.stringify(value));

                    });//_each
                    //sorting
                    var sortedList = _.sortBy(selectedProducts, 'img');
                    _.each(sortedList, function(value, key){
                      console.log("key:"+key+", value:"+JSON.stringify(value));

                    });//_each
                    */
                    for(i=0;i<selectedProducts.length;i++){
                      var isDuplicate = false;
                      // watch out for duplicate keys:
                      //console.log("i="+i);
                      for(j=0;j<curProducts.length;j++){
                        // compare:
                        //console.log("    j="+j);
                        if(selectedProducts[i].key==curProducts[j].key){ isDuplicate=true;break;}
                      }
                      if(isDuplicate==false) tempProducts.push(selectedProducts[i]);
                    }
                    //$scope.selectedProducts=$scope.selectedProducts.concat(tempProducts);
                    $scope.selectedProducts=_.union($scope.selectedProducts, tempProducts);
                    // now sort the products list by name:
                    $scope.selectedProducts = _.sortBy($scope.selectedProducts, 'name');

                  };// setSelectedProducts()
                  $scope.onSelectProductsCancel = function(){
                    $scope.isDashboardShow = true;
                    $scope.isSelectorShow = false;


                  };//onSelectProductsCancel();
                  $scope.removeProduct = function(index){
                    var choice = $window.confirm(strMsgRmPrdConfirm);
                    if(choice) $scope.selectedProducts.splice(index, 1);

                  }//removeProduct
                  // this function is called when the ok button on the ui is clicked
                  $scope.addProductsToGroup = function(){
                    // here it should call the service for doing http thing
                    $scope.message = "Please wait. Updating...";
                    var productsKeys = []
                    _.each($scope.selectedProducts, function(item){
                      productsKeys.push(item.key);
                    });
                    /*
                    for(i=0; i<$scope.selectedProducts.length;i++){
                      productsKeys.push($scope.selectedProducts[i].key);
                    }
                    */
                    var dataToServer = {'topic': 'add-products', 
                                        'group': $scope.targetProductsGroup.key,
                                        'products': productsKeys
                                       };
                    updateProductGroup(dataToServer);

                  };



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
                  $scope.loadProductsGroup();
                }];

