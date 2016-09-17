'use strict()';
//require('angular');
//console.log('here');
var app = angular.module('app');
app.controller('WelcomeController', require('./welcome-controller'));
app.controller('ProductsAreaController', require('./products-area-controller'));
app.controller('ProductsMenuController', require('./products-menu-controller'));
app.controller('NewProductController', require('./new-product-controller'));
app.controller('ProductsEditController', require('./products-edit-controller'));
app.controller('ProductsSelectorController', require('./products-selector'));
app.controller('ProductsGroupsMenuController', require('./products-groups-menu'));
app.controller('NewProductGroupController', require('./new-product-group-controller'));
app.controller('ProductsGroupsEditController', require('./products-groups-edit-controller'));
app.controller('ProductsGroupsSelectorController', require('./products-groups-selector-controller'));
app.controller('ProductsGroupsEditPlaceController', require('./products-groups-edit-place-controller'));
app.controller('EditProductsGroupAttributesController', require('./edit-products-group-attributes-controller'));
app.controller('AddProductsToGroupController', require('./add-products-to-group'));
app.controller('EmployeesController', require('./employees-controller'));
app.controller('SettingsController', require('./settings-controller'));



