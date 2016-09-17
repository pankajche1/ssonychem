/*global describe, it, beforeEach, inject, expect*/
(function () {
  'use strict()';

  describe('Products Controllers', function () {
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
    });//describe new  Product Controller tests
    describe('Edit Product Controller', function(){
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
        createController = function() {
          return $controller('ProductsEditController', {'$scope' : $scope });
        };
      }));//beforeEach
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
      // Load the module containing the app, only 'ng' is loaded by default.
      it('should have a non-null controller', function () {
        // when this controller is created it loads the product groups autmatically. so this line:
        $httpBackend.expectGET('/products');
        var ctrl = createController();
        $httpBackend.flush();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);
	expect($scope).not.toBe(null);
	expect($scope).not.toBe(undefined);
      });//non null objects test
      it('should load products from the server', function(){

        getReqHandler.respond(function(method, url, data, headers, params){
          var objects = [{'name':'Product 1'},{'name':'Product 2'}];
          var nextCursor = false;
          var prevCursor = false;
          var prev = false;
          var next = false;
          return [200, {'objects': objects, 'next_cursor': nextCursor, 
                        'prev_cursor': prevCursor, 'prev': prev, 'next': next}];

        }//function
                             );//respond
        $httpBackend.expectGET('/products');
        var ctrl = createController();
        $httpBackend.flush();
        // now check the products loaded to the controller:
        var products = $scope.products;
        expect(products.length).toBe(2);
      });//it should load products from the server
      it('should delete a desired produce from the server db', function(){
        //prepare your products groups response:
        getReqHandler.respond(function(method, url, data, headers, params){
          var objects = [{'name':'Product 1', 'key':'abc'},{'name':'Product 2','key':'def'}];
          var nextCursor = false;
          var prevCursor = false;
          var prev = false;
          var next = false;
          return [200, {'objects': objects, 'next_cursor': nextCursor, 
                        'prev_cursor': prevCursor, 'prev': prev, 'next': next}];

        }); 
        // loads the product groups:
        $httpBackend.expectGET('/products');
        var ctrl = createController();
        $httpBackend.flush();
        // now check the products loaded to the controller:
        var products = $scope.products;
        expect(products.length).toBe(2);
        // now for delete request:
        // now for delete operation:
        // (it should not be given in get request but for now it is like this. change it later)
        $httpBackend.expect('GET', /\/products/g, undefined, undefined, [])
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

            return [200, {'message':'Product Deleted Successfully.', 'error':false}];
          }//function
                  );//respond()

        spyOn(window, 'confirm').and.returnValue(true);
        $scope.onDeleteClick({'index':1});
        $httpBackend.flush();
        expect($scope.ajaxMessage).toBe('Product Deleted Successfully.');




      });// it should delete a product from the server

    });//describe edit product controller
    describe('ProductsSelectorController', function(){
      var ctrl, $scope, $httpBackend, getRequestHandler, postReqHandler;
      beforeEach(module('app'));
      beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, $injector) {
	$httpBackend = _$httpBackend_;
        getReqHandler = $httpBackend.when('GET', 
                                          /\/products/g, 
                                          undefined, 
                                          undefined, 
                                          [])
          .respond(function(method, url, data, headers, params){
          return [200,{'message':'list is this','objects': [
            {'name':'P1', 'key':'abc'},
            {'name':'P2','key':'def'},
            {'name':'P3','key':'ghi'},
            {'name':'P4','key':'klm'}
          ]}
                 ];


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
        createController = function() {
          return $controller('ProductsSelectorController', {'$scope' : $scope });
        };//getController
      getProductsService = function(){
        return $injector.get("ProductsService");
        };//getService
      }));//beforeEach
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
      it('should have a non-null controller and download the products from the server', function () {
        // when this controller is created it loads the product groups autmatically. so this line:
        $httpBackend.expectGET('/products');
        var ctrl = createController();
        var service = getProductsService();
        $httpBackend.flush();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);
        // and should download products from the server:

      // now lets check if it has downloaded right products from the server:
      var products = service.getProducts()
      expect(products.length).toBe(4);
      expect(products[0].key).toBe('abc');
      });//non null objects test
      it('should create a products list for model to ui', function(){
        // when this controller is created it loads the product groups autmatically. so this line:
        $httpBackend.expectGET('/products');
        var ctrl = createController();
        var service = getProductsService();
        $httpBackend.flush();
        // prepare a temporaray list of products with only name, key, and isSelected fields.
        var tempProducts = $scope.tempProducts;
        expect(tempProducts).not.toBe(null);
	expect(tempProducts).not.toBe(undefined);
        // now see what list has been created:
        var tmpProducts = $scope.tempProducts;
        expect(tmpProducts.length).toBe(4);
        //now key and isSelected field:
        expect(tmpProducts[0].name).toBe('P1');        
        expect(tmpProducts[0].key).toBe('abc');        
        expect(tmpProducts[0].isSelected).toBe(false);
        // now the data for the ui is to be prepared:
        // check the data:
        expect($scope.data).not.toBe(null);
        expect($scope.data).not.toBe(undefined);
        // message should be empty string cx there are some products in the list:
        expect($scope.data.message).toBe('');
        // products in the data:
        expect($scope.data.products.length).toBe(4);
        expect($scope.data.products[0].isSelected).toBe(false);
      });//it should create products list for model to ui


    });// describe productsSelectorController
  });//describe 'projects controllers 
}());
