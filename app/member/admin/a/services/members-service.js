'use-strict()';
app.factory('MembersService',['$http','$log', function($http, $log){
  var url = '/members';
  var members= [];
  var service = {};
  service.setMembers = function(membersIn){
    members = membersIn;
  }
  service.getMembers = function(){
    return members;
  }//
  service.fetchMembers = function(){
    return $http.get(url);
  }//
  service.fetchMember = function(key){
    return $http.get(url+'?topic=single&key='+key);
    };//fetch member
  service.updateMember = function(data){
    return $http.post(url, data, {headers: {'Content-Type': 'json'}});
  }

  return service;
}]
);
