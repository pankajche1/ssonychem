app.controller('HeaderController', ['$scope', '$log', function($scope, $log){
  //$log.info(user);
  $scope.data={'topbarData':{'menuItems':[{'label':'logout','href':user.logoutUrl }]}};
}]);
