'use-strict()';
module.exports=['$http','$log', function($http, $log){
    var url = '/products';
    var products = [];
    var service = {};
    service.setProducts = function(productsIn){
        products = productsIn;
    }
    service.getProducts = function(){
        return $http.get(url);
    }//getDetailsByKey()
   /* for creating a new project group on the server */
    service.saveProduct = function(data){
        return $http.post(url, data, {headers: {'Content-Type': 'json'}});
   }
    //for deleting a product group:
    service.deleteProduct = function(key){
        return $http.get(url+"?mode=delete&key="+key);
    }
    return service;
}];
