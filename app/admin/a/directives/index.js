'use strict()';
var app = angular.module('app');
app.directive('pnav', require('./nav.js'));//direcitve
app.directive('headerTopBar', require('./header-top-bar.js'));
app.directive('headerMiddleBar', require('./header-middle-bar.js'));
app.directive('productsGroup', require('./products-group.js'));
app.directive('editProductsGroupAttributes', require('./edit-products-group-attributes.js'));
app.directive('product', require('./product.js'));
app.directive('editProductAttributes', require('./edit-products-attributes.js'));
app.directive('productsSelector', require('./products-selector.js'));




