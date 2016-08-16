/*global describe, it, beforeEach, inject, expect*/
(function () {
'use strict()';

	describe('Projects Groups Controller test', function () {
		var ctrl, scope, store, $httpBackend, dataToServer;

                var pages = [];
                //var urlBase = '/members';
		beforeEach(module('app'));
		beforeEach(inject(function (_$httpBackend_,$controller, $rootScope) {
			$httpBackend = _$httpBackend_;
        		$httpBackend.when('GET', /\/products-groups/g, undefined, undefined, [])
                             .respond(function(method, url, data, headers, params){
    
                               return [200, [{'name':'PG1'},{'name':'PG2'}]];
                             }//function
                         );//respond()
        		$httpBackend.when('POST', /\/save-product-group/g, undefined, undefined, [])
                             .respond(function(method, url, data, headers, params){
                               dataToServer = data;
                               return [200, {'error':'false',
                                               'message':'new product group saved successfully'}];

                         }//function
                         );//respond

                        // scope to access controller's scope:
			scope = $rootScope.$new();
			// get the controller:
			ctrl = $controller('ProductsGroupsController', {
				$scope: scope
			});
		}));//beforeEach

		// Load the module containing the app, only 'ng' is loaded by default.
		//beforeEach(module('todomvc'));
                // test 1
		it('should have a non-null controller', function () {
			expect(ctrl).not.toBe(null);
			expect(ctrl).not.toBe(undefined);
			expect(scope).not.toBe(null);
			expect(scope).not.toBe(undefined);
		});//non null objects test
                // test 2
                it('should save data to the server', function(){
                        scope.projectGroup = {'name':'Cleaning Agent'}
                        scope.saveProductGroup();
			$httpBackend.flush();
                        //console.log(dataToServer);
                        //expect(dataToServer.name).toBe('Cleaning Agent1');
                });//it 
                it('should get the product groups data from the server', function(){


                });//it

	});//describe 'projects groups controller test'
}());
