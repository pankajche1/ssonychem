'use strict()';
app.factory('ProductsService', 
            ['$http','$log',function($http, $log){
              var service = {};
              var url = '/products';
              var products = [];
              service.setProducts = function(productsIn){
                products = productsIn;
              }
              service.getProducts = function(){
                return products;
              }//getProducts from here local
              service.fetchProducts = function(){
                return $http.get(url);
              }//get products from ther server

              return service;

            }]);//Service
