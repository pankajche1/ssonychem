(function(){
'use strict()';
describe('Main Describe Directives', function(){
  describe('Products Groups Directive', function(){
      var scope, compile;
      beforeEach(module('app'));
      beforeEach(inject(function(_$compile_,_$rootScope_){
    	compile = _$compile_;
	$rootScope = _$rootScope_;
    	scope = $rootScope.$new({});
      }));//beforeEach
      
      function compileElement(){
	var strHtml = '<products-groups data="data"></products-groups>';
        var elem = angular.element(strHtml);
	var elemCompiled = compile(elem)(scope);
        return elemCompiled;
      }
      it('should create a proper directive', function(){
	var elem = compileElement();
        var groups = [{'name':'group 1'},{'name':'group 2'},{'name':'group 3'},{'name':'group 4'}];
        scope.data = {'message':'', 'groups':groups};
        scope.$digest();
        // now test here:
        //console.log(elem.html());
        var divs = elem.find('div');
        //expect(divs.length).toBe(1);
      });//it test 1 should show proper ajax message


  });//Products Groups directives
  describe('ProductsGroup Single Details', function(){
    var scope, compile;
      beforeEach(module('app'));
      beforeEach(inject(function(_$compile_,_$rootScope_){
    	compile = _$compile_;
	$rootScope = _$rootScope_;
    	scope = $rootScope.$new({});
      }));//beforeEach
      
      function compileElement(){
	var strHtml = '<products-group data="data"></products-group>';
        var elem = angular.element(strHtml);
	var elemCompiled = compile(elem)(scope);
        return elemCompiled;
      }
      it('should create a proper directive', function(){
	var elem = compileElement();
        var group = {'name':'group 1', 'products':[{'name':'P1'},{'name':'P2'},{'name':'P3'},{'name':'P4'}]};
        scope.data = {'message':'', 'group':group};
        scope.$digest();
        // now test here:
        console.log(elem.html());
        var divs = elem.find('div');
        //expect(divs.length).toBe(1);
      });//it test 1 should show proper ajax message

  });//describe products group: to show a single group with all its products


});//main describe
})();

