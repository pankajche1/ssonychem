(function(){
'use strict()';
  describe('members controllers test case', function(){
    describe('members list ctrl', function(){
      beforeEach(module('app'));
      beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
        $httpBackend = _$httpBackend_;
        // variable that will be put in the script tag in the server:
        user = {'nickname':'pankajche1', 'key':'pankajche1-key', 'logoutUrl':'pankajche1-logout-url', 'isAdmin':true};
        getReqHandler = $httpBackend.when('GET', 
                                          /\/members/g, 
                                          undefined, 
                                          undefined, 
                                          [])
          .respond(function(method, url, data, headers, params){
            return [200, {'members': [{'name':'pankaj ji', 'key':'member-0-key'},{'name':'lallu ji','key':'member-1-key'}]}];
          }//function
                  );//respond()
        $scope = $rootScope.$new();
        getController = function(){
          return $controller('MembersController', {'$scope':$scope});
        };//getController()

      }));//beforeEach()
      
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
      it('should give good ctrl', function(){
        var ctrl = getController();
        expect($scope.data.status).toBe('Loading. Please wait...');
        $httpBackend.flush();
        expect($scope.data.status).toBe('');        
        expect(ctrl).not.toBe(undefined);
        expect($scope.data.members.length).toBe(2);
        expect($scope.data.members[0].name).toBe('pankaj ji');
      });//it 1 should give defined ctrl
      it('should have access to a target member', function(){
        var ctrl = getController();
        expect($scope.isSelectorShow).toBe(true);
        expect($scope.isMemberEditShow).toBe(false);
        $httpBackend.flush();
        // now we have a list of member on ui. and each member item has an 'edit' button
        // an edit button of a target member is clicked
        // and it will call onEditMemberClick() method
        // click the onEditMemberClick()
        iMember = 0;
        $httpBackend.expectGET(/\/members/g).respond(function(method, url, data, headers, params){
          var topic, key;
          var strQuery = matchParams(url.split('?')[1]);
          expect(strQuery.topic).not.toBe(undefined);
          expect(strQuery.key).not.toBe(undefined);
          topic = strQuery.topic;
          key = strQuery.key;
          expect(topic).toBe('single');                                 
          expect(key).toBe('member-0-key');                                 
          return [200, {'key':'member-0-key','level':'guest', 'name':'Pankaj Kumar'}];
        });//respond ;
        $scope.onEditMemberClick(iMember);
        // the member selector area should get invisible and the edit area should be visible
        expect($scope.isSelectorShow).toBe(false);
        expect($scope.isMemberEditShow).toBe(true);
        expect($scope.data.status).toBe('Loading. Please wait...');
        $httpBackend.flush();
        expect($scope.data.status).toBe('');
        // now check the target member
        expect($scope.data.targetMember).not.toBe(undefined);
        expect($scope.data.targetMember).not.toBe(null);
        // check the key and name
        expect($scope.data.targetMember.name).toBe('Pankaj Kumar');
        expect($scope.data.targetMember.key).toBe('member-0-key');
        expect($scope.data.targetMember.level).toBe('0');// guest level member
        // check the level
        // now we have to change the level of this member from 'guest' to 'admin a'
        $httpBackend.expectPOST(/\/members/g).respond(
          function(method, url, data, headers, params){
            var dataFromClient = JSON.parse(data);
            expect(dataFromClient.topic).toBe('update-level');
            expect(dataFromClient.member.key).toBe('member-0-key');
            expect(dataFromClient.member.level).toBe('admin-a');
            return [200, {'error':'false',
                          'message':'member updated.'}];
          }
        );
        // now change the ng-model value to the level for admin a level
        $scope.data.targetMember.level = '2'; // 2 is the value in the <select> DOM element
        $scope.updateMember();
        $httpBackend.flush();
        // now check for the ok button click that removes the member edit ui
        $scope.onOkClick();
        expect($scope.isSelectorShow).toBe(true);
        expect($scope.isMemberEditShow).toBe(false);
      });//it 2 should have access to members service
    });// members list ctrl

  });//main describe
}());
