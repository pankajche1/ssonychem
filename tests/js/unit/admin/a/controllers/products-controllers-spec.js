/*global describe, it, beforeEach, inject, expect*/
(function () {
'use strict()';

	describe('Projects Controllers', function () {
            describe('New Product Controller',function(){
		var ctrl, $scope, $httpBackend, getRequestHandler, postReqHandler;
		beforeEach(module('app'));
		beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
			$httpBackend = _$httpBackend_;
        		getReqHandler = $httpBackend.when('GET', 
                                                          /\/products/g, 
                                                          undefined, 
                                                          undefined, 
                                                          [])
                             .respond(function(method, url, data, headers, params){
                               return [200, [{'name':'PG1'},{'name':'PG2'}]];
                             }//function
                         );//respond()
        		postReqHandler = $httpBackend.when('POST', 
                                                            /\/products/g, 
                                                            undefined, 
                                                            undefined, 
                                                            [])
                             .respond(function(method, url, data, headers, params){
                               //dataToServer = data;
                               return [200, {'error':'false',
                                               'message':''}];

                         }//function
                         );//respond
                        
                        // scope to access controller's scope:
			$scope = $rootScope.$new();
			// get the controller:
			ctrl = $controller('NewProductController', {
				$scope: $scope
			});
		}));//beforeEach

		// Load the module containing the app, only 'ng' is loaded by default.
		it('should have a non-null controller', function () {
			expect(ctrl).not.toBe(null);
			expect(ctrl).not.toBe(undefined);
			expect($scope).not.toBe(null);
			expect($scope).not.toBe(undefined);
		});//non null objects test
                //test 2
                it('should save a new product to the server', function(){
                    var data = {'name':'Product 1'}
                    $scope.product = data;
                    postReqHandler.respond(function(method, url, data, headers, params){
                               var name;
                               // showing error in this:
                               var product = JSON.parse(data);
                               expect(product.name).toBe('Product 1');
                               return [200, {'error':'false',
                                               'message':''}];
                         }//function
                    );//respond
                    $httpBackend.expectPOST('/products');
                    $scope.submit();
                    $httpBackend.flush();
                });//test 2
            });// ProductsController tests


	});//describe 'projects controllers 
}());
