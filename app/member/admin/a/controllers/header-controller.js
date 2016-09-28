common.controller('HeaderController', ['$scope', function($scope){
  $scope.data={'topbarData':{'menuItems':[{'label':'logout','href':user.logoutUrl }]}};
}]);
