(function(){
  "use strict()";
  describe('Common Directives Test',function(){

    describe('1: nav bar  directive', function(){
      var $scope, $compile;
      beforeEach(module('common'));
      beforeEach(inject(function(_$compile_,_$rootScope_){
    	$compile = _$compile_;
	$rootScope = _$rootScope_;
    	$scope = $rootScope.$new({});
      }));//beforeEach
      
      function compileElement(){
	var strHtml = '<pnav></pnav>';
        var elem = angular.element(strHtml);
	var elemCompiled = $compile(elem)($scope);
        return elemCompiled;
      }
      it('should create a proper directive', function(){
	var elem = compileElement();
        //scope.data = {'message':'no products to show!', 'products':[]};
        $scope.$digest();
        // now test here:
        //console.log(elem.html());
        var divs = elem.find('div');
        //expect(divs.length).toBe(1);
      });//it test 1 should show proper ajax message
    });//3 describe products attributes edit directive

  });//describe main
}());


