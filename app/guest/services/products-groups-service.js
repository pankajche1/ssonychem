'use strict()';
app.factory('ProductsGroupsService', 
            ['$http','$log',function($http, $log){
              var service = {};
              var url = '/products-groups';
              var productsGroups = [];
              service.setProductsGroups = function(productsGrpIn){
                productsGroups = productsGrpIn;
              }
              service.getProductsGroups = function(){
                return productsGroups;
              }//getProducts from here local
              service.fetchProductsGroups = function(){
                return $http.get(url);
                
              }//get products from ther server
              service.fetchGroupDetails = function(key){
                var strUrl = url+"?topic=single&key="+key;
                return $http.get(strUrl);
              };//fetchGroupDetails
              return service;

            }]);//Service
