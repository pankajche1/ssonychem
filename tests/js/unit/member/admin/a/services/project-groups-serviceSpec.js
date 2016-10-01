/*global describe, it, beforeEach, inject, expect*/
(function () {
'use strict()';

	describe('Projects Groups Service test', function () {
		var ctrl, scope, store, productsGroupsService, $httpBackend;

                var pages = [];
                //var urlBase = '/members';
		beforeEach(module('app'));
                beforeEach(function(){
                   inject(function($injector){
                       productsGroupsService = $injector.get("ProductsGroupsService");
                   });//inject
                });//beforeEach
		beforeEach(inject(function (_$httpBackend_) {
			$httpBackend = _$httpBackend_;
        		$httpBackend.when('GET',/\/products-groups/g,undefined,undefined,[])
                             .respond(function(method, url, data, headers, params){

                          var params2 = matchParams(url.split('?')[1]);
                          if(params2.prev_cursor != undefined){
                                     console.log(params2.prev_cursor);

                          }
                          if(params2.next_cursor != undefined){
                              console.log(params2.next_cursor);

                          }
                               return [200, [{'name':'PG1'},{'name':'PG2'}]];

                         });
        		$httpBackend.when('POST', /\/products-groups/g, undefined, undefined, [])
                             .respond(function(method, url, data, headers, params){
                               var dataFromClient = JSON.parse(data);
                               //expect(dataFromClient.group.name).toBe('Detergent Products');
                               expect(dataFromClient.topic).toBe('new');
                               return [200, {'error':'false','message':'new product group saved successfully'}];

                         });


                         //expect(method, url, [data], [headers], [keys]);
                 
		}));//before each http
                afterEach(function() {
                   $httpBackend.verifyNoOutstandingExpectation();
                   $httpBackend.verifyNoOutstandingRequest();
                });
		// Load the module containing the app, only 'ng' is loaded by default.
		//beforeEach(module('todomvc'));
		it('should have a non-null service', function () {
			expect(productsGroupsService).not.toBe(null);
			expect(productsGroupsService).not.toBe(undefined);
		});//non null objects test
                it('should get data from the server', function(){
                        productsGroupsService.fetchProductsGroups()
                            .then(function (response) {
                                 expect(response.data[0].name).toBe('PG1');
                            }, function (error) {
                               console.log('error in getting data from http');
                             });//member service get prev page
			$httpBackend.flush();
                });//retrieving data from http request
                it('should save data to the server', function(){
                        var data = {'name':'Cleaning Agent', 'topic':'new'}

                        productsGroupsService.saveProductGroup(data)
                            .then(function (response) {
                                 expect(response.data.message).toBe('new product group saved successfully');
                            }, function (error) {
                               console.log('error in getting data from http');
                             });//member service get prev page
			$httpBackend.flush();
                });//retrieving data from http request
              
    

	});//describe 'projects groups service test'
}());
