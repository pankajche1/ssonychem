'use strict()';
//require('angular');
//console.log('here');
var app = angular.module('app');
app.controller('WelcomeController', require('./welcome-controller'));//controller
app.controller('AboutUsController', require('./about-us-controller'));//controller
app.controller('ContactUsController', require('./contact-us-controller'));//controller
app.controller('ProductsController', require('./products-controller'));//controller



