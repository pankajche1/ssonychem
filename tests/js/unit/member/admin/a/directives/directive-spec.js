(function(){
  "use strict()";
  describe('Directives Test',function(){
    // 1 describe product directive
    describe('Product Directive', function(){
      var tmpl, scope;
      beforeEach(module('app'));
      beforeEach(inject(function(_$compile_,_$rootScope_){
	$compile = _$compile_;
	$rootScope = _$rootScope_;
	scope = $rootScope.$new({});
      }));//beforeEach
      function createElement(){
	element = '<div>' +
	  '<product ng-repeat="item in products" data="item"></product>'+
	  '</div>' ;
	scope.products= [{'name':'Product 1'},{'name':'Product 2'}];
	element=$compile(element)(scope);
	scope.$digest();
      }
      it('should create a product div',function(){
	//pending();
	createElement();
	expect(element.find('button').length).toEqual(4);
	//expect(scope.projects.length).toEqual(0);
	//var isolateScope  = element.isolateScope();
	//console.log(element.html());
	//expect(element.find('img').length).toEqual(1);
      });//it
    });//1.  product directive test
    describe("2. Products Selectors Directive", function(){
      var tmpl, scope, innerScope;
      beforeEach(module('app'));
      beforeEach(inject(function(_$compile_,_$rootScope_){
	$compile = _$compile_;
	$rootScope = _$rootScope_;
	scope = $rootScope.$new({});
      }));//beforeEach
      function createElement(){
	var strHtml = '<products-selector cancel="cancel()" ok="ok()" data="data"></products-selector>';
        var elem = angular.element(strHtml);
	var compiledElem = $compile(elem)(scope);
        return compiledElem;
      }
      it('should create a product selector div',function(){
	var elem = createElement();
        scope.$digest();
        // there will be two buttons at the bottom of the interface
        // 1 ok button 2 cancel button
        var buttons = elem.find('button');
	expect(buttons.length).toEqual(2);
        expect(buttons.eq(0).text()).toBe('Exit');
      });//it
      it('should show proper ajax message when no products', function(){
	var elem = createElement();
        scope.data = {'message':'no products to show!', 'products':[]};
        scope.$digest();
        var divs = elem.find('div');
        //expect(divs.length).toBe(5);
        //console.log(elem.html());
        //expect(divs.eq(2).text()).toBe('no products to show!');
      });//it should show proper ajax message
      it('buttons should call the proper functions of the scope', function(){
        // these functions are defined outside in the controller
        var elem = createElement();
        scope.cancel = jasmine.createSpy('cancel');
        scope.ok = jasmine.createSpy('ok');
        /*
        scope.cancel = function(){
          console.log('this is cancel clicked');
        };
        scope.ok = function(){
          console.log('this is ok clicked');
        };
        */
        scope.$digest();
	var isolateScope  = elem.isolateScope();
        expect(isolateScope.tobeDefind);
        var buttons = elem.find('button');
        //spyOn(scope, 'ok');
        //spyOn(scope, 'cancel');
        elem.find('button').eq(0).triggerHandler('click');
        elem.find('button').eq(1).triggerHandler('click');
        expect(scope.ok).toHaveBeenCalled();
        expect(scope.cancel).toHaveBeenCalled();

      });//buttons should call the proper functions
      it('should create a list of proudcts when the list is available', function(){
        var elem = createElement();
        scope.data = {
          'message':'no products to show!', 
          'products':[
            {'name':'Washing Detergent'},
            {'name':'Car Washer'}
          ]};
        scope.$digest();
        // it should add 2 more divs to the DOM:
        var divs = elem.find('div');
        //expect(divs.length).toBe(7);
        //expect(divs.eq(4).text()).toBe('Washing Detergent');
        // now if we want to change to products list:
	var isolateScope  = elem.isolateScope();
        // see the present dom elements:
        // now change the product list
        var products = [{'name':'Baby Wash'},{'name':'Toilet Cleaner'}];
        isolateScope.data.products = products;
        isolateScope.$apply();
        //expect(divs.length).toBe(7);
        divs = elem.find('div');
        //expect(divs.eq(4).text()).toBe('Baby Wash');
        //expect(divs.eq(5).text()).toBe('Toilet Cleaner');
      });//it should create a list of products on the user interface
      it('should have checkboxes against each product', function(){
        var elem = createElement();
        // the new attribute to the product is 'isSelected'
        scope.data = {
          'message':'no products to show!', 
          'products':[
            {'name':'Washing Detergent', 'key':'abc', 'isSelected':false},
            {'name':'Car Washer', 'key':'def', 'isSelected': false}
          ]};
        scope.$digest();
        // it should add 2 more divs to the DOM:
        //var divs = elem.find('div');
        //expect(divs.length).toBe(7);
        // now get the checkboxes:
        //var checkboxes = elem.find('input[type=checkbox]');
        var checkboxes = elem.find('input');
        expect(checkboxes.length).toBe(2);
      });//it should have checkboxes against each product
      it('should select the desired product', function(){
        var elem = createElement();
        // the new attribute to the product is 'isSelected'
        scope.data = {
          'message':'no products to show!', 
          'products':[
            {'name':'Washing Detergent', 'key':'abc', 'isSelected':false},
            {'name':'Car Washer', 'key':'def', 'isSelected': false},
            {'name':'Car Washer1', 'key':'ghi', 'isSelected': false},
            {'name':'Car Washer2', 'key':'jkl', 'isSelected': false}
          ]};
        scope.$digest();
	var isolateScope  = elem.isolateScope();
        //isolateScope.data.products = products;
        isolateScope.$apply();
        // now get the checkboxes:
        //var checkboxes = elem.find('input[type=checkbox]');
        var checkboxes = elem.find('input');
        //console.log(checkboxes);
        expect(checkboxes.length).toBe(4);
        // now select a product by clicking a checkbox:[Note: this does not work]
        //checkboxes.eq(0).triggerHandler('click');
        //checkboxes.eq(0).selected = true;
        //console.log('val:'+checkboxes.eq(0).selected);
        // now it should select the product at index 0:
        // this test does not work . I need to learn it how to test checkbox click Mon Sep 12 00:39:27 IST 2016
        //expect(isolateScope.data.products[0].isSelected).toBe(true);
      });//it should selected the desired products
    });//2 describe products selector directive
    describe('3: Products attibutes edit direcitive', function(){
      var scope, compile;
      beforeEach(module('app'));
      beforeEach(inject(function(_$compile_,_$rootScope_){
    	compile = _$compile_;
	$rootScope = _$rootScope_;
    	scope = $rootScope.$new({});
      }));//beforeEach
      
      function compileElement(){
	var strHtml = '<edit-product-attributes data="data" submit="update()" cancel="cancel()"></edit-product-attributes>';
        var elem = angular.element(strHtml);
	var elemCompiled = compile(elem)(scope);
        return elemCompiled;
      }
      it('should create a proper directive', function(){
	var elem = compileElement();
        //scope.data = {'message':'no products to show!', 'products':[]};
        scope.$digest();
        // now test here:
        //console.log(elem.html());
        var divs = elem.find('div');
        //expect(divs.length).toBe(1);
      });//it test 1 should show proper ajax message
      it('should the selected products name', function(){
	var elem = compileElement();
        scope.data = {'product':{'name':'Car Wash'}};
        scope.$digest();
        // now test here:
        //console.log(elem.html());
        //var divs = elem.find('div');
        //expect(divs.length).toBe(2);
      });//it test 2 should show the selected products name
      it('should create a proper form for attributes', function(){
	var elem = compileElement();
        scope.data = {'product':{'name':'Car Wash'}};
        scope.$digest();
        // now test here:
        //console.log(elem.html());

      });//it test 4 should create a proper form for product attributes
      it('should create proper buttons and click roles', function(){
	var elem = compileElement();
        scope.data = {'product':{'name':'Car Wash'}};
        scope.update = jasmine.createSpy('update');
        scope.cancel = jasmine.createSpy('cancel');
        //scope.update = function(){};
        //scope.cancel = function(){};
        scope.$digest();
        var buttons = elem.find('button');
        expect(buttons.length).toEqual(2);
        expect(buttons.eq(0).text()).toBe('Update');
        expect(buttons.eq(1).text()).toBe('Exit');
        //spyOn(scope, 'update');
        //spyOn(scope, 'cancel');
        //submit is the second button:
        //Note : clicking test does not work! I don't know why?
        //elem.find('button').eq(0).triggerHandler('click');
        //elem.find('button').eq(1).triggerHandler('click');
        //expect(scope.update).toHaveBeenCalled();
        //expect(scope.cancel).toHaveBeenCalled();
        /*
        spyOn(scope, 'cancel');
        //spyOn(scope, 'cancel');
        //submit is the second button:
        elem.find('button').eq(0).triggerHandler('click');
        //elem.find('button').eq(1).triggerHandler('click');
        expect(scope.cancel).toHaveBeenCalled();
        */

      });//it test 5 should create proper buttons and their click role
      it('should connect properly to the product model', function(){
	var elem = compileElement();
        scope.data = {'product':{'name':'Car Wash'}};
        scope.$digest();
        //console.log(elem.html());
        var inputs = elem.find('input');
        expect(inputs.length).toEqual(2);
        //notes: I don't know much about testing the elements. mi bilga le nu mi tadni ko'a kei .i ki'i
        //console.log(inputs.eq(1).text());
        //inputs.eq(1).text('panak')
        //console.log(inputs.eq(1).text());
        


      });//it test 6 should connect properly to the product model

    });//3 describe products attributes edit directive

  });//describe main
}());

