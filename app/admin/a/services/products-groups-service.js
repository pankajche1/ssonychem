'use-strict()';
module.exports=['$http','$log', function($http, $log){
    var url = '/products-groups';
    //var url2 = '/save-product-group';
    var groups = [];
    var service = {};
    service.setProductsGroups = function(groupsIn){
        groups = groupsIn;
    }
    service.getProductsGroups = function(){
        return $http.get(url);
    }//getDetailsByKey()
   /* for creating a new project group on the server */
    service.saveProductGroup = function(data){
        return $http.post(url, data, {headers: {'Content-Type': 'json'}});
   }
    //for deleting a product group:
    service.deleteProductGroup = function(key){
        return $http.get(url+"?mode=delete&key="+key);
    }
    //for deleting a product group:
    service.updateProductGroup = function(data){
        return $http.post(url, data, {headers: {'Content-Type': 'json'}});
    }
    return service;
}];
