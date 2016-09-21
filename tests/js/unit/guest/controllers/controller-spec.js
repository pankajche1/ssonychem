/*global describe, it, beforeEach, inject, expect*/
(function () {
  'use strict()';
  describe('controllers testing', function(){
    describe('ProductsController', function(){
      beforeEach(module('app'));
      beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
	$httpBackend = _$httpBackend_;
        getReqHandler = $httpBackend.when('GET', 
                                          /\/products/g, 
                                          undefined, 
                                          undefined, 
                                          [])
          .respond(function(method, url, data, headers, params){
            return [200,{'objects': [{'name':'P1'},{'name':'P2'}]}];
          }//function
                  );//respond()
        // scope to access controller's scope:
	$scope = $rootScope.$new();
	// get the controller:
	ctrl = $controller('ProductsController', {
	  $scope: $scope
	});
      }));//beforeEach
      it('should have a non null controller', function(){
        $httpBackend.flush();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);
        // test the products :
        var products = $scope.products;
        expect(products.length).toBe(2);
        expect(products[0].name).toBe('P1');
        
      });//it 1 should have a non null controller

    });//describe products controller
    /*
      controller for the list of products groups not a single group
      */
    describe('ProductsGroupsController', function(){
      beforeEach(module('app'));
      beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
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
	// get the controller:
	ctrl = $controller('ProductsGroupsController', {
	  $scope: $scope
	});
      }));//beforeEach
      it('should have a non null controller AND download products groups at start', function(){
        $httpBackend.flush();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);
        // let's test the groups downloaded
        var groups = $scope.data.groups;
        expect(groups.length).toBe(2);
        expect(groups[1].name).toBe('PG2');
      });//it 1 should have a non null controller



    });//describe products group controller
    describe('ProductsGroupController for a single group', function(){
      var scope, param;
      beforeEach(module('app'));
      beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, $routeParams) { 
	$httpBackend = _$httpBackend_;
        param = $routeParams;
        getReqHandler = $httpBackend.when('GET', 
                                          /\/products-groups/g, 
                                          undefined, 
                                          undefined, 
                                          [])
          .respond(function(method, url, data, headers, params){
            var topic, key, products;
            var lstQuery = matchParams(url.split('?')[1]);
            topic = lstQuery.topic;
            key = lstQuery.key;
            expect(lstQuery.topic).not.toBe(undefined)
            expect(lstQuery.key).not.toBe(undefined)
            expect(topic).toBe('single');                                 
            expect(key).toBe('grp-1-key');
            products = [{'name':'P1'},{'name':'P2'},{'name':'P3'},{'name':'P4'}];
            return [200,{'name':'Product Group 1','products':products}];
          }//function
                  );//respond()
        // scope to access controller's scope:
	scope = $rootScope.$new();
	// get the controller:
        getController = function(){
	  return $controller('ProductsGroupController', { $scope: scope});
          };//getController()
      }));//beforeEach
      it('should have a non null controller AND download products groups at start', function(){
        param.key = 'grp-1-key';
        var ctrl = getController();
        $httpBackend.flush();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);
        // and it should load the target products group with the products attached to it.
        var group = scope.data.group;
        expect(group.name).toBe('Product Group 1');
        //now see the products
        var products = scope.data.group.products;
        expect(products.length).toBe(4);
      });//it 1 should have a non null controller





    });//describe for single ProductsGroupController
  });//main describe
}());
