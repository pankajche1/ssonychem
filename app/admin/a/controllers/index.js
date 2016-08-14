'use strict()';
//require('angular');
//console.log('here');
var app = angular.module('app');
app.controller('WelcomeController', require('./welcome-controller'));//controller
app.controller('ProductsController', require('./products-controller'));//controller
app.controller('EmployeesController', require('./employees-controller'));//controllerm
app.controller('SettingsController', require('./settings-controller'));//controller



