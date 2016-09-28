/*global describe, it, beforeEach, inject, expect*/
//var user = {'', };
(function () {
  'use strict()';
  describe('member general controllers testing', function(){
    describe('Welcome Controller', function(){
      var $httpBackend, $scope;
      beforeEach(module('app'));
      beforeEach(inject(function(_$httpBackend_, $controller, $rootScope){
        $httpBackend = _$httpBackend_;
        user = {'nickname':'Pankaj'}
        $scope = $rootScope.$new();
        getController = function(){
          return $controller('WelcomeController', {'$scope':$scope} );
          };


      }));//beforeEach
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
      it('should create a proper controller', function(){
        var ctrl = getController();
	expect(ctrl).not.toBe(null);
	expect(ctrl).not.toBe(undefined);
        expect($scope.user.nickname).toBe('Pankaj');



      });// it 1 should create a proper controller
    });//describe welcome controller
  });//main describe member general controllers testing
}());

