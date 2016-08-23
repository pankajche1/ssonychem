(function(){
    "use strict()";
    describe('Directives Test',function(){
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

    });//describe main
}());

