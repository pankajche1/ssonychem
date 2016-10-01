app.controller('MembersController', ['$scope', 'MembersService', '$log', function($scope, membersService, $log){
  //$scope.members = [{'name':'Dagar ji'}];
  $scope.data = {'isDisabled':false, 'message':'', 'members':[], 'targetMember':null};
  $scope.isSelectorShow = true;
  $scope.isMemberEditShow = false;
  $scope.isEditBtnShow = user.isAdmin;// for app admin only
  $scope.fetchMembers = function(){
    $scope.data.isDisabled=true;
    $scope.data.status = "Loading. Please wait...";
    fetchMembersFromService();
  };//function fetchProducts()
  function fetchMembersFromService(){
    membersService.fetchMembers()
      .then(function (response) {
        $scope.data.isDisabled=false;
        $scope.data.status = "";
        $scope.data.members = response.data.members;
        // also get the prev and next cursors TODO
        // and this data will be cached in the service:
        membersService.setMembers(response.data.members);
        // for display in the ui we should have some manipulated list:
        //prepareProductsList(response.data.objects);
      }, function (error) {
        $scope.data.isDisabled=false;
        $scope.data.status = "Error in loading!";
      });//save data by service
  }
  $scope.onEditMemberClick = function(index){
    $scope.isSelectorShow = false;
    $scope.isMemberEditShow = true;
    $scope.data.status = "Loading. Please wait...";
    // get the target member
    var key = $scope.data.members[index].key;
    // get the member from the server
    membersService.fetchMember(key).then(function(response){
      var member = response.data;
      if(member == null) $log.error('Member is null.');
      if(member == undefined) $log.error('Member is undefined.');
      $scope.data.targetMember = member;
      if(member.level == 'admin-b') $scope.data.targetMember.level='1';
      else if(member.level == 'admin-a') $scope.data.targetMember.level= '2';
      else level = $scope.data.targetMember.level= '0';
      $scope.data.status = "";
    }, function(error){
        $scope.data.status = "Error in loading!";
    });
  };//onEditClick
  $scope.onOkClick = function(){
    $scope.isSelectorShow = true;
    $scope.isMemberEditShow = false;
  }
  $scope.updateMember = function(){
    $scope.data.status = 'Updating. Please wait...';
    // set the level to be compatible with the server:
    // ng-model is data.targetMember.level
    var level = 'guest';
    if($scope.data.targetMember.level == '1') level='admin-b';
    else if($scope.data.targetMember.level == '2') level = 'admin-a'
    else level = 'guest';
    var data = {'topic':'update-level', 'member':{'key': $scope.data.targetMember.key, 'level':level}};
    membersService.updateMember(data).then(function(response){
      $scope.data.status = response.data.message;
    }, function(error){
      $scope.data.status = "Error in loading!";
    });
  }
  $scope.fetchMembers();






}]);
