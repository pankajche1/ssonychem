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
                        $httpBackend.expectGET('/products-groups');
                        var ctrl = createController();
                  	$httpBackend.flush();
			expect(ctrl).not.toBe(null);
			expect(ctrl).not.toBe(undefined);

		});//non null objects test
                it('should delete a product group', function(){
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
	});//describe 'projects groups controller test'
}());
