(function(){
  "use strict()";
  describe('Common Directives Test',function(){

    describe('1: nav bar  directive', function(){
      var $scope, $compile;
      var strNavHtml ="<pnav>"
          +"<p-nav-item page='#', label='Home1'></p-nav-item>"
          +"<p-nav-item page='#/contact-us', label='Contact Us'></p-nav-item>"
          +"</pnav>"; 
      beforeEach(module('common'));
      beforeEach(inject(function(_$compile_,_$rootScope_){
    	$compile = _$compile_;
	$rootScope = _$rootScope_;
    	$scope = $rootScope.$new({});
      }));//beforeEach
      
      function compileElement(strIn){
        var strHtml = strIn; 
        var elem = angular.element(strHtml);
	var elemCompiled = $compile(elem)($scope);
        return elemCompiled;
      }
      it('should create a proper directive', function(){
	var elem = compileElement(strNavHtml);
        //scope.data = {'message':'no products to show!', 'products':[]};
        $scope.$digest();
        // now test here:
        console.log(elem.html());
        var divs = elem.find('div');
        //expect(divs.length).toBe(1);
      });//it test 1 should show proper ajax message
      it('should show a desired menu item in mobile navbar', function(){
        var strNavHtml ="<pnav>"
          +"<p-nav-item page='#', label='Home1'></p-nav-item>"
          +"<p-nav-item page='#/contact-us', label='Contact Us' isMobile='true'></p-nav-item>"
          +"</pnav>"; 
        var elem = compileElement(strNavHtml);
        $scope.$digest();

      });//it 4 should show a menu item when it is mobile menu 
    });//3 describe products attributes edit directive

  });//describe main
}());


