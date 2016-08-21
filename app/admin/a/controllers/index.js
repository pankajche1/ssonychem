'use strict()';
//require('angular');
//console.log('here');
var app = angular.module('app');
app.controller('WelcomeController', require('./welcome-controller'));//controller
app.controller('ProductsAreaController', require('./products-area-controller'));//controller
app.controller('ProductsMenuController', require('./products-menu-controller'));//controller
app.controller('NewProductController', require('./new-product-controller'));//controller
app.controller('ProductsEditController', require('./products-edit-controller'));//controller
app.controller('ProductsGroupsMenuController', require('./products-groups-menu'));//controller
app.controller('NewProductGroupController', require('./new-product-group-controller'));//controller
app.controller('ProductsGroupsEditController', require('./products-groups-edit-controller'));//controller
app.controller('EmployeesController', require('./employees-controller'));//controllerm
app.controller('SettingsController', require('./settings-controller'));//controller



