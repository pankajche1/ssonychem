'use-strict()';
app.controller('WelcomeController', ['$rootScope','$scope','$http', function($rootScope,$scope, $http){
  // this data from the js objects on the dom by the server:
  $scope.user = user;
  $scope.message="Welcome From Controller on angular js";
  // taking data from the script tag that was created in the server side:
  var founder =  {'name1':'C. L. Pathariya',
                  'city':'Vadodara', 'mobile':'09724098346'};
  $scope.info1 = "This is from SSonychem Private Limited";      
  
}]);

