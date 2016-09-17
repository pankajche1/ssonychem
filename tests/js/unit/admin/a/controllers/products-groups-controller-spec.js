/*global describe, it, beforeEach, inject, expect*/
(function () {
  'use strict()';

  describe('Projects Groups Controller test', function () {
    describe('ProductsGroupsController',function(){
      var ctrl, $scope, $httpBackend;
      beforeEach(module('app'));
      beforeEach(inject(function ($controller) {
        $scope = {};
	// get the controller:
	ctrl = $controller('ProductsGroupsMenuController', {
	  $scope: $scope
	});
      }));//beforeEach

      // Load the module containing the app, only 'ng' is loaded by default.
      //beforeEach(module('todomvc'));
      // test 1
      it('should have a non-null controller', function () {
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);
	expect($scope).not.toBe(null);
	expect($scope).not.toBe(undefined);
      });//non null objects test

    });// ProductsGroupsController tests
    describe('New Product Group Controller', function(){
      var $scope, $httpBackend, postReqHandler;
      beforeEach(module('app'));
      beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        postReqHandler = $httpBackend.when('POST', 
                                           /\/products-groups/g, 
                                           undefined, 
                                           undefined, 
                                           [])
          .respond(function(method, url, data, headers, params){
            //dataToServer = data;
            return [200, {'error':'false',
                          'message':'new product group saved successfully'}];

          }//function
                  );//respond
	$scope = $rootScope.$new();
        createController = function() {
          return $controller('NewProductGroupController', {'$scope' : $scope });
        };

      }));//beforeEach
      it('should have a non-null controller', function () {
        var ctrl = createController();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);
      });//non null objects test
      it('should save a new product group to the server', function(){
        var ctrl = createController();
        postReqHandler.respond(function(method, url, data, headers, params){
          var name;
          // showing error in this:
          var dataFromClient = JSON.parse(data);
          expect(dataFromClient.group.name).toBe('Detergent Products');
          expect(dataFromClient.topic).toBe('new');
          return [200, {'error':'false',
                        'message':''}];
        }//function
                              );//respond
        // set the form data to scope as ng-models:
        var group = {'name':'Detergent Products'};
        $scope.productGroup = group;
        //submit the form
        $scope.submit();
        $httpBackend.flush();


      });// it should save a new product group to the server

    });//NewProductGroupController
    describe('ProductsGroupsEditController', function(){
      var  $scope, $httpBackend, getReqHandler, postReqHandler;
      beforeEach(module('app'));
      beforeEach(inject(function (_$httpBackend_,$controller, $rootScope) {
	$httpBackend = _$httpBackend_;
        
        getReqHandler = $httpBackend.when('GET', 
                                          /\/products-groups/g, 
                                          undefined, 
                                          undefined, 
                                          [])
          .respond(function(method, url, data, headers, params){
            return [200, [{'name':'PG1'},{'name':'PG2'}]];
          }//function
                  );//respond()
        postReqHandler = $httpBackend.when('POST', 
                                           /\/save-product-group/g, 
                                           undefined, 
                                           undefined, 
                                           [])
          .respond(function(method, url, data, headers, params){
            //dataToServer = data;
            return [200, {'error':'false',
                          'message':'new product group saved successfully'}];

          }//function
                  );//respond
        
        // scope to access controller's scope:
	$scope = $rootScope.$new();
        //$scope = {};
	// get the controller:
        /*
	  ctrl = $controller('ProductsGroupsEditController', {
	  $scope: $scope
	  });
        */
        //$rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        //var $controller = $injector.get('$controller');

        createController = function() {
          return $controller('ProductsGroupsEditController', {'$scope' : $scope });
        };

      }));//beforeEach
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
      it('should have a non-null controller', function () {
        // when this controller is created it loads the product groups autmatically. so this line:
        //$httpBackend.expectGET('/products-groups');
        var ctrl = createController();
        //$httpBackend.flush();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);

      });//non null objects test
      //pankaj note: now there is no such facility in this controller so it is removed.
      xit('should delete a product group', function(){
        //prepare your products groups response:
        getReqHandler.respond(200, 
                              [
                                {'name':'Cleaning Agents', 'key':'abc'},
                                {'name':'Car Wash', 'key':'def'},
                                {'name':'Hospital Wash', 'key':'ghi'},
                                {'name':'Detergents', 'key':'jkl'}

                              ]);
        // loads the product groups:
        $httpBackend.expectGET('/products-groups');
        var ctrl = createController();
        $httpBackend.flush();
        // now for delete operation:
        // (it should not be given in get request but for now it is like this. change it later)
        $httpBackend.expect('GET', /\/products-groups/g, undefined, undefined, [])
          .respond(function(method, url, data, headers, params){
            var mode, key;
            var qString = matchParams(url.split('?')[1]);
            if(qString.mode != undefined){
              mode = qString.mode;

            }
            if(qString.key != undefined){
              key = qString.key;

            }
            expect(mode).toBe('delete');                                 
            expect(key).toBe('def');                                 

            return [200, {'message':'Product Group Deleted Successfully', 'error':false}];
          }//function
                  );//respond()
        spyOn(window, 'confirm').and.returnValue(true);
        // data at 1 is deleted: index=1 (this is the index of the list)
        // this is second element of the list:
        $scope.onDeleteClick({'index':1});
	$httpBackend.flush();
        expect($scope.ajaxMessage).toBe('Product Group Deleted Successfully');


      });// should delete a product group
    });// ProductsGroupsEditController tests
    describe('ProductsGroupsEditPlaceController', function(){
      var  $scope, $httpBackend, getReqHandler, postReqHandler;
      beforeEach(module('app'));
      beforeEach(inject(function (_$httpBackend_,$controller, $rootScope) {
	$httpBackend = _$httpBackend_;
        getReqHandler = $httpBackend.when('GET', 
                                          /\/products-groups/g, 
                                          undefined, 
                                          undefined, 
                                          [])
          .respond(function(method, url, data, headers, params){
            return [200, [{'name':'PG1'},{'name':'PG2'}]];
          }//function
                  );//respond()
        // write here just to check mark test
        postReqHandler = $httpBackend.when('POST', 
                                           /\/save-product-group/g, 
                                           undefined, 
                                           undefined, 
                                           [])
          .respond(function(method, url, data, headers, params){
            //dataToServer = data;
            return [200, {'error':'false',
                          'message':'new product group saved successfully'}];

          }//function
                  );//respond
        // scope to access controller's scope:
	$scope = $rootScope.$new();
        createController = function() {
          return $controller('ProductsGroupsEditPlaceController', {'$scope' : $scope });
        };

      }));//beforeEach
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
      it('should have a non-null controller', function () {
        var ctrl = createController();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);

      });//non null objects test
      it('should set the values of variables for various modes of ui display', function(){
        var ctrl = createController();
        expect($scope.isEditAttributes).toBe(false);
        expect($scope.isAddProducts).toBe(false);
        // after click of the button edit attributes
        $scope.editAttributes();
        expect($scope.isEditAttributes).toBe(true);
        expect($scope.isAddProducts).toBe(false);
        // after click of the button add products
        $scope.addProducts();
        expect($scope.isEditAttributes).toBe(false);
        expect($scope.isAddProducts).toBe(true);

      });//it should properly set the values of variables
    });//describe test products group edit place controller
    describe('EditProductsGroupAttributesController', function(){
      var  $scope, $httpBackend, getReqHandler, postReqHandler;
      beforeEach(module('app'));
      beforeEach(inject(function (_$httpBackend_,$controller, $rootScope) {
	$httpBackend = _$httpBackend_;
        getReqHandler = $httpBackend.when('GET', 
                                          /\/products-groups/g, 
                                          undefined, 
                                          undefined, 
                                          [])
          .respond(function(method, url, data, headers, params){
            return [200, [{'name':'PG1'},{'name':'PG2'}]];
          }//function
                  );//respond()
        postReqHandler = $httpBackend.when('POST', 
                                           /\/products-groups/g, 
                                           undefined, 
                                           undefined, 
                                           [])
          .respond(function(method, url, data, headers, params){
            //dataToServer = data;
            return [200, {'error':'false',
                          'message':'new product group saved successfully'}];

          }//function
                  );//respond
        // scope to access controller's scope:
	$scope = $rootScope.$new();
        createController = function() {
          return $controller('EditProductsGroupAttributesController', {'$scope' : $scope });
        };

      }));//beforeEach
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
      it('should have a non-null controller', function () {
        var ctrl = createController();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);

      });//non null objects test
      
      it('should update group attribute', function(){
        var ctrl = createController();
        // set the target group. Actually this is done in the parent controller:
        $scope.targetProductsGroup = {'name':'Cleaning Agent','key':'abc'};
        // now change the targetGroup name:
        $scope.targetProductsGroup.name = "Detergent Products";
        // this is set by the ui html thing when the user changes the name:
        $scope.data = {'topic':'update', 'group':$scope.targetProductsGroup};
        postReqHandler.respond(function(method, url, data, headers, params){
          var name;
          // showing error in this:
          var dataFromClient = JSON.parse(data);
          expect(dataFromClient.group.name).toBe('Detergent Products');
          expect(dataFromClient.topic).toBe('update');
          return [200, {'error':'false',
                        'message':''}];
        }//function
                              );//respond
        // update:
        $scope.update();
        $httpBackend.flush();
      });// it should update the product group attributes

    });//EditProductsGroupAttributesController describe
  });//describe 'projects groups controller test'
  describe('Products Groups Selector Controller', function(){
    var  $scope, $httpBackend, getReqHandler, postReqHandler;
    beforeEach(module('app'));
    beforeEach(inject(function (_$httpBackend_,$controller, $rootScope, $injector) {
      $httpBackend = _$httpBackend_;
      getReqHandler = $httpBackend.when('GET', 
                                        /\/products-groups/g, 
                                        undefined, 
                                        undefined, 
                                        [])
        .respond(function(method, url, data, headers, params){
          return [200, [{'name':'PG1'},{'name':'PG2'}]];
        }//function
                );//respond()
      postReqHandler = $httpBackend.when('POST', 
                                         /\/products-groups/g, 
                                         undefined, 
                                         undefined, 
                                         [])
        .respond(function(method, url, data, headers, params){
          //dataToServer = data;
          return [200, {'error':'false',
                        'message':'new product group saved successfully'}];

        }//function
                  );//respond
      // scope to access controller's scope:

      $scope = $rootScope.$new();
      // get the parent controller:
      createParentController = function(){
        return $controller('ProductsGroupsEditController', { $scope: $scope });
      };
      createController = function() {
        return $controller('ProductsGroupsSelectorController', {$scope : $scope });
      };
      getProductGroupsService = function(){
        return $injector.get("ProductsGroupsService");
        };
    }));//beforeEach
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('should have a non-null controller and it will fetch products groups', function () {
      $httpBackend.expectGET('/products-groups');
      var ctrl = createController();
      $httpBackend.flush();
      expect(ctrl).not.toBe(null);
      expect(ctrl).not.toBe(undefined);


    });//non null objects test        
    it('should varify a test message', function(){
      $httpBackend.expectGET('/products-groups');
      var ctrlParent = createParentController();
      var ctrl = createController();
      $httpBackend.flush();
      expect($scope.info1).toBe('Sunny Kailash Dagar');

    });//should varify a test message
    it('should load products groups from the server when created', function(){
      $httpBackend.expectGET('/products-groups');
      var ctrl = createController();
      $httpBackend.flush();
      expect($scope.productsGroups).not.toBe(null);
      expect($scope.productsGroups).not.toBe(undefined);
      expect($scope.productsGroups.length).toBe(2);
    });//it should have a list of products groups and length zero
    it('should put the products groups in the service when loaded from the server', function(){
      $httpBackend.expectGET('/products-groups');
      var ctrl = createController();
      $httpBackend.flush();
      // get the product groups from the service:
      var service = getProductGroupsService();
      var groups = service.getProductsGroups();
      expect(groups).not.toBe(null);
      expect(groups).not.toBe(undefined);
      expect(groups.length).toBe(2);
    });//it should have a list of products groups and length zero
    it('should have a delete function to delete a particular group', function(){
      //prepare your products groups response:
      getReqHandler.respond(200, 
                            [
                              {'name':'Cleaning Agents', 'key':'abc'},
                              {'name':'Car Wash', 'key':'def'},
                              {'name':'Hospital Wash', 'key':'ghi'},
                              {'name':'Detergents', 'key':'jkl'}

                            ]);
      var ctrl = createController();
      $httpBackend.flush();
      // at start the products groups are:
      expect($scope.productsGroups.length).toBe(4);
      expect($scope.productsGroups[1].name).toBe('Car Wash');
      postReqHandler.respond(function(method, url, data, headers, params){
        var dataFromClient = JSON.parse(data);
        expect(dataFromClient.topic).toBe('delete');
        expect(dataFromClient.key).toBe('def');
        return [200, {'error':'false',
                      'message':'Product Group Deleted Successfully'}];
      }//function
                            );//respond
      /*
      $httpBackend.expect('GET', /\/products-groups/g, undefined, undefined, [])
        .respond(function(method, url, data, headers, params){
          var mode, key;
          var qString = matchParams(url.split('?')[1]);
          if(qString.mode != undefined){
            mode = qString.mode;

          }
          if(qString.key != undefined){
            key = qString.key;

          }
          expect(mode).toBe('delete');                                 
          expect(key).toBe('def');                                 

          return [200, {'message':'Product Group Deleted Successfully', 'error':false}];
        }//function
                );//respond()
      */
      // call the delete function:
      spyOn(window, 'confirm').and.returnValue(true);
      $scope.deleteGroup({'index':1});
      $httpBackend.flush();
      // confirm that the desired group is removed:
      expect($scope.productsGroups.length).toBe(3);
      expect($scope.productsGroups[1].name).toBe('Hospital Wash');
      // how to check the products groups in the service object?
      // yes now i have done that and you can check it this way:
      // get the product groups from the service:
      var service = getProductGroupsService();
      var groups = service.getProductsGroups();
      expect(groups).not.toBe(null);
      expect(groups).not.toBe(undefined);
      expect(groups.length).toBe(3);      
      expect(groups[1].name).toBe('Hospital Wash');
    });//it should have a delete function to delete a particular group
    it('onEditClick function', function(){
      // the parent controller that will have its parent scope in
      // the DOM html
      var ctrlParent = createParentController();
      //prepare your products groups response:
      getReqHandler.respond(200, 
                            [
                              {'name':'Cleaning Agents', 'key':'abc'},
                              {'name':'Car Wash', 'key':'def'},
                              {'name':'Hospital Wash', 'key':'ghi'},
                              {'name':'Detergents', 'key':'jkl'}

                            ]);
      var ctrl = createController();
      $httpBackend.flush();
      // now check if  the onEditClick function exists
      expect($scope.onEditClick).not.toBe(undefined);
      // now call the function and suppose you want to edit the first group
      // on ui you will do it by clicking the 'edit' button on the desired group
      // so you give the index 0
      $scope.onEditClick({'index':0});
      // it should select the group at the index for editing process:
      //var targetGroup = $scope.targetGroup;
      //expect(targetGroup).not.toBe(undefined);
      //expect(targetGroup).not.toBe(null);
      //now check the content of the target group:
      //expect(targetGroup.name).toBe('Cleaning Agents');
      // now it should set the desired product group in the service as the targetProductsGroup
      var service = getProductGroupsService();
      var targetGroup = service.getTargetProductsGroup();
      expect(targetGroup).not.toBe(null);
      expect(targetGroup).not.toBe(undefined);
      expect(targetGroup.name).toBe('Cleaning Agents');
      // now the main parent ctrl should show the same target group:
      expect($scope.targetProductsGroup).not.toBe(null);
      expect($scope.targetProductsGroup).not.toBe(undefined);
      expect($scope.targetProductsGroup.name).toBe('Cleaning Agents');

    });//should have an onEditClick function to goto the desired group for editing
  });//describe ProductsGroupsSelectorController
  describe('AddProductsToGroupController Tests', function(){
    var  $scope, $httpBackend, getReqHandler, getGrpReqHandler,  postReqHandler;
    beforeEach(module('app'));
    beforeEach(inject(function (_$httpBackend_,$controller, $rootScope, $injector) {
      $httpBackend = _$httpBackend_;
      /*
      getReqHandler = $httpBackend.when('GET', 
                                        /\/products/g, 
                                        undefined, 
                                        undefined, 
                                        [])
        .respond(function(method, url, data, headers, params){
          return [200, [
            {'name':'P1', 'key':'abc'},
            {'name':'P2','key':'def'},
            {'name':'P3','key':'ghi'},
            {'name':'P4','key':'klm'}
          ]
                 ];
        }//function
                );//respond()
      */
      getGrpReqHandler = $httpBackend.when('GET', 
                                        /\/products-groups/g, 
                                        undefined, 
                                        undefined, 
                                        [])
          .respond(function(method, url, data, headers, params){
            var topic, key;
            var qString = matchParams(url.split('?')[1]);
            if(qString.topic != undefined){
              topic = qString.topic;

            }
            if(qString.key != undefined){
              key = qString.key;

            }
            expect(topic).toBe('single');                                 
            expect(key).toBe('grp-1-key');                                 

            return [200, {'key':'grp-1-key', 'name':'Group 1'}];
          }//function
                  );//respond()    
      postReqHandler = $httpBackend.when('POST', 
                                         /\/products-groups/g, 
                                         undefined, 
                                         undefined, 
                                         [])
        .respond(function(method, url, data, headers, params){
          //dataToServer = data;
          return [200, {'error':'false',
                        'message':'new product group saved successfully'}];

        }//function
                  );//respond
      // scope to access controller's scope:
      $scope = $rootScope.$new();
      // get the parent controller:
      createParentController = function(){
        return $controller('ProductsGroupsEditController', { $scope: $scope });
      };
      createController = function() {
        return $controller('AddProductsToGroupController', {$scope : $scope });
      };
      getProductGroupsService = function(){
        return $injector.get("ProductsGroupsService");
        };
      getProductsService = function(){
        return $injector.get("ProductsService");
        };
    }));//beforeEach
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('should create a non null and defined controller and should load the selected group info frm server', function(){
      //$httpBackend.expectGET('/products-groups');
      $scope.targetProductsGroup = {'name':'Grp1', 'key':'grp-1-key'};
      var ctrl = createController();
      $httpBackend.flush();
      expect(ctrl).not.toBe(null);
      expect(ctrl).not.toBe(undefined);
      //test the message from the controller:
      //note: this test will not work now cz message removed now:
      //expect($scope.message).toBe('test message');
      
    });//should create no-null and defined controller
    it('should add selected products to the selected group on the server', function(){
      getGrpReqHandler.respond(function(method, url, data, headers, params){
        var topic, key, products;
        var qString = matchParams(url.split('?')[1]);
        if(qString.topic != undefined){
          topic = qString.topic;
        }
        if(qString.key != undefined){
          key = qString.key;
        }
        expect(topic).toBe('single');                                 
        expect(key).toBe('grp-1-key');
        //you have to give the already present products on this group
        products = [{'name':'P1','key':'P1-key'}, {'name':'P2','key':'P2-key'},{'name':'P3','key':'P3-key'},{'name':'P4','key':'P4-key'}];  
        return [200, {'key':'grp-1-key', 'name':'Group 1', 'products':products}];
      }//function
                  );//respond()          
      $scope.targetProductsGroup = {'name':'Grp1', 'key':'grp-1-key'};
      // creat a controller:
      var ctrl = createController();
      $httpBackend.flush();
      //check the products list download also:
      var products = $scope.productsGroupDetails.products;
      expect(products.length).toBe(4);
      expect(products[0].key).toBe('P1-key');
      //now the user wants to add more products to the current group.
      // now the $scope object should have a list of the selected products:
      // and this is done by the products selector. so we just do it
       var selectedProducts = [{'name':'P3','key':'ghi','img':'Z'},
                              {'name':'P2','key':'def','img':'B'},
                              {'name':'P1','key':'abc','img':'A'},
                              {'name':'P4','key':'jkl','img':'C'}];
      $scope.onSelectProductsDone(selectedProducts);
      // now the above function should not include the already present products with the product group:
      // now see if the $scope has got the products or not from inside the ctrl :
      expect($scope.selectedProducts.length).toBe(8);
      // get to selectedProducts here
      // now there should be button for adding there prouducts' keys to the selected group
      //  we need to make this data: {'topic': 'add-products', 'group-key':'key', 'products-keys':[]};
      // prepare the $scope for sending data to the server:
      // in 'group' there is the key of the selected group and in the 'products' entry there is a list of products keys.
      postReqHandler.respond(function(method, url, data, headers, params){
          var dataFromClient = JSON.parse(data);
          expect(dataFromClient.group).toBe('grp-1-key');
          expect(dataFromClient.products.length).toBe(8);
          expect(dataFromClient.products[1]).toBe('abc');
        return [200, {'error':'false',
                      'message':'new product group saved successfully'}];
      }//function
                           );//respond
      $scope.addProductsToGroup();
      $httpBackend.flush();
    });//it should download products from the server
    it('should sort the products by names', function(){
  getGrpReqHandler.respond(function(method, url, data, headers, params){
        var topic, key, products;
        var qString = matchParams(url.split('?')[1]);
        if(qString.topic != undefined){
          topic = qString.topic;
        }
        if(qString.key != undefined){
          key = qString.key;
        }
        expect(topic).toBe('single');                                 
        expect(key).toBe('grp-1-key');
        //you have to give the already present products on this group
        products = [{'name':'Zameeer','key':'zameer-key'},
                    {'name':'Manish','key':'manish-key'},
                    {'name':'Sarita','key':'sarita-key'},
                    {'name':'Hemant','key':'hemant-key'}];  
        return [200, {'key':'grp-1-key', 'name':'Group 1', 'products':products}];
      }//function
                  );//respond()          
      $scope.targetProductsGroup = {'name':'Grp1', 'key':'grp-1-key'};
      // creat a controller:
      var ctrl = createController();
      $httpBackend.flush();
      //now the user wants to add more products to the current group.
      // now the $scope object should have a list of the selected products:
      // and this is done by the products selector. so we just do it
       var selectedProducts = [{'name':'Sunny','key':'sunny-key'},
                              {'name':'Ashutosh','key':'ashutosh-key'},
                              {'name':'Zahid','key':'zahid-key'},
                              {'name':'Babu','key':'babu-key'}];
      $scope.onSelectProductsDone(selectedProducts);
      expect($scope.selectedProducts[0].name).toBe('Ashutosh');
      // now the above function should not include the already present products with the product group:
      // in 'group' there is the key of the selected group and in the 'products' entry there is a list of products keys.
      postReqHandler.respond(function(method, url, data, headers, params){
        var dataFromClient = JSON.parse(data);
        expect(dataFromClient.products[0]).toBe('ashutosh-key');
        expect(dataFromClient.products[7]).toBe('zameer-key');

        return [200, {'error':'false',
                      'message':'new product group saved successfully'}];
      }//function
                           );//respond
      $scope.addProductsToGroup();
      $httpBackend.flush();



    });//it should sort the selected products by names
    it('should remove the duplicate products in the selected list', function(){
  getGrpReqHandler.respond(function(method, url, data, headers, params){
        var topic, key, products;
        var qString = matchParams(url.split('?')[1]);
        if(qString.topic != undefined){
          topic = qString.topic;
        }
        if(qString.key != undefined){
          key = qString.key;
        }
        expect(topic).toBe('single');                                 
        expect(key).toBe('grp-1-key');
        //you have to give the already present products on this group
        products = [{'name':'Zameeer','key':'zameer-key'},
                    {'name':'Manish','key':'manish-key'},
                    {'name':'Sarita','key':'sarita-key'},
                    {'name':'Sunny','key':'sunny-key'}];  
        return [200, {'key':'grp-1-key', 'name':'Group 1', 'products':products}];
      }//function
                  );//respond()          
      $scope.targetProductsGroup = {'name':'Grp1', 'key':'grp-1-key'};
      // creat a controller:
      var ctrl = createController();
      $httpBackend.flush();
      // see the size of the selected products
      expect(_.size($scope.selectedProducts)).toBe(4);
      //now the user wants to add more products to the current group.
      // now the $scope object should have a list of the selected products:
      // and this is done by the products selector. so we just do it
       var selectedProducts = [{'name':'Sunny','key':'sunny-key'},
                              {'name':'Manish','key':'manish-key'},
                              {'name':'Zahid','key':'zahid-key'},
                              {'name':'Babu','key':'babu-key'}];
      $scope.onSelectProductsDone(selectedProducts);
      expect(_.size($scope.selectedProducts)).toBe(6);      
      expect($scope.selectedProducts[0].name).toBe('Babu');
      // now the above function should not include the already present products with the product group:
      // in 'group' there is the key of the selected group and in the 'products' entry there is a list of products keys.
      postReqHandler.respond(function(method, url, data, headers, params){
        var dataFromClient = JSON.parse(data);
        expect(dataFromClient.products[0]).toBe('babu-key');
        expect(dataFromClient.products[3]).toBe('sunny-key');

        return [200, {'error':'false',
                      'message':'new product group saved successfully'}];
      }//function
                           );//respond
      $scope.addProductsToGroup();
      $httpBackend.flush();



    });//it should remove the duplication of the products



  });//describe AddProductsToGroupController test
}());
