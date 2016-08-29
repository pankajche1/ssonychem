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
             xdescribe('EditProductsGroupAttributesController', function(){
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
                it('should have the target product group', function(){
                        var ctrl = createController();
			expect($scope.targetGroup).not.toBe(null);
			expect($scope.targetGroup).not.toBe(undefined);
                 });//it should have the data of the group that it is going to update
                it('should have the desired target product group', function(){
                        var ctrl = createController();
                        $scope.targetGroup = {'name':'Cleaning Agent','key':'abc'};
			expect($scope.targetGroup.name).toBe('Cleaning Agent');
                 });//it should have the data of the group that it is going to update
                it('should update group attribute', function(){
                    var ctrl = createController();
                    // set the target group
                    $scope.targetGroup = {'name':'Cleaning Agent','key':'abc'};
                    // now change the targetGroup name:
                    $scope.targetGroup.name = "Detergent Products";
                    // this is connected to the form as models and any change there is reflected here:
                    $scope.data = {'topic':'update', 'group':{}};
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
                        // scope to access controller's scope:
			$scope = $rootScope.$new();
                        createController = function() {
                           return $controller('ProductsGroupsSelectorController', {'$scope' : $scope });
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
                    var ctrl = createController();
                    $httpBackend.flush();
                    expect($scope.testMessage).toBe('pankaj');

                });//should varify a test message
                it('should load products groups from the server when created', function(){
                    $httpBackend.expectGET('/products-groups');
                    var ctrl = createController();
                    $httpBackend.flush();
		    expect($scope.productsGroups).not.toBe(null);
		    expect($scope.productsGroups).not.toBe(undefined);
		    expect($scope.productsGroups.length).toBe(2);
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
                    // call the delete function:
                    spyOn(window, 'confirm').and.returnValue(true);
                    $scope.deleteGroup({'index':1});
                    $httpBackend.flush();
                    // confirm that the desired group is removed:
      		    expect($scope.productsGroups.length).toBe(3);
                    expect($scope.productsGroups[1].name).toBe('Hospital Wash');
                    // how to check the products groups in the service object?
                });//it should have a delete function to delete a particular group

        });//describe ProductsGroupsSelectorController
}());
