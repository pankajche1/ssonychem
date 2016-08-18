'use-strict()';
module.exports=['$http','$log', function($http, $log){
    var url1 = '/product-groups';
    var url2 = '/save-product-group';
    var service = {};
    service.getProductsGroups = function(){
        return $http.get(url1);
    }//getDetailsByKey()
   /* for creating a new project group on the server */

    service.saveProductGroup = function(data){
        return $http.post(url2, data, {headers: {'Content-Type': 'json'}});
   }
    return service;
}];
