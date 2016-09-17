'use-strict()';
module.exports=['$http','$log', function($http, $log){
  var url = '/products-groups';
  //var url2 = '/save-product-group';
  var groups = [];
  var targetProductsGroup = null;
  var targetProductsGroupIndex = null;
  var service = {};
  service.setProductsGroups = function(groupsIn){
    groups = groupsIn;
  }
  service.fetchProductsGroups = function(){
    return $http.get(url);
  }
  service.fetchProductsGroupByKey = function(key){
    var strUrl = url+"?topic=single&key="+key;
    return $http.get(strUrl);
  };
  service.getProductsGroups = function(){
    return groups;
  }//getDetailsByKey()
  service.getTargetProductsGroup = function(){
    return targetProductsGroup;
  }
  service.setTargetProductsGroupIndex = function(index){
    targetProductsGroupIndex = index;
    targetProductsGroup = groups[index];
  }
  /* for creating a new project group on the server */
  service.saveProductGroup = function(data){
    return $http.post(url, data, {headers: {'Content-Type': 'json'}});
  }
  //for deleting a product group:
  /*
  service.deleteProductGroup = function(key){
    //return $http.get(url+"?mode=delete&key="+key);
    return $http.post(url, data, {headers: {'Content-Type': 'json'}});
  }
  */
  //for deleting a product group:
  service.updateProductGroup = function(data){
    return $http.post(url, data, {headers: {'Content-Type': 'json'}});
  }
  return service;
}];
