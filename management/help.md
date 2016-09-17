**Q:** Where is the angular js documentation?

**Ans:**   ~/Softwares/angular/angular-1.5.0-rc.0 and there you will find a file 'server'. run it by './server'. ok


Here I will make a plane to know which controller is doing what. Because it is getting so confusing actually.

```javascript
app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/welcome',{
				templateUrl:'/admin/a/welcome.html',controller:'WelcomeController'});
		$routeProvider.when('/products-area',{
				templateUrl:'/admin/a/products-area.html',
                                controller:'ProductsAreaController'});
		$routeProvider.when('/products-menu',{
				templateUrl:'/admin/a/products-menu.html',
                                controller:'ProductsMenuController'});
		$routeProvider.when('/products-edit',{
				templateUrl:'/admin/a/products-edit.html',
                                controller:'ProductsEditController'});
		$routeProvider.when('/new-product',{
				templateUrl:'/admin/a/new-product.html',
                                controller:'NewProductController'});
        // it is for goint to the base section of the products groups 
		$routeProvider.when('/products-groups',{
				templateUrl:'/admin/a/products-groups-menu.html',
                                controller:'ProductsGroupsMenuController'});
		$routeProvider.when('/products-groups-edit',{
				templateUrl:'/admin/a/products-groups-edit.html',
                                controller:'ProductsGroupsEditController'});
		$routeProvider.when('/products-groups-edit-place',{
				templateUrl:'/admin/a/products-group-edit-place.html',
                                controller:'ProductsGroupsEditPlaceController'});
		$routeProvider.when('/new-product-group',{
				templateUrl:'/admin/a/new-product-group.html',
                                controller:'NewProductGroupController'});
		$routeProvider.when('/emplopyees',{
				templateUrl:'/admin/a/employees.html',
                                controller:'EmployeesController'});
		$routeProvider.when('/settings',{
				templateUrl:'/admin/a/settings.html',
                                controller:'SettingsController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
```
These are the controllers related to *products groups*:

```javascript
		$routeProvider.when('/products-groups',{
				templateUrl:'/admin/a/products-groups-menu.html',
                                controller:'ProductsGroupsMenuController'});
		$routeProvider.when('/products-groups-edit',{
				templateUrl:'/admin/a/products-groups-edit.html',
                                controller:'ProductsGroupsEditController'});
		$routeProvider.when('/products-groups-edit-place',{
				templateUrl:'/admin/a/products-group-edit-place.html',
                                controller:'ProductsGroupsEditPlaceController'});
		$routeProvider.when('/new-product-group',{
				templateUrl:'/admin/a/new-product-group.html',
                                controller:'NewProductGroupController'});
```
The first route is *products-groups* and the controller is *ProductsGroupsMenuController*
and the template is *products-groups-menu.html*

```html
<h2>Products Groups Section</h2>
<div class="panel panel-default">
    <div class="panel-body">
       <p> Products Groups Edit Section</p>
       <div><a href="#/products-groups-edit">Edit Groups</a></div>
       
    </div>
</div>
<div class="panel panel-default">
    <div class="panel-body">
       <p>Add new product group</p>
       <div><a href="#/new-product-group">Add</a></div>
    </div>
</div>

```
Here the route is *products-groups-edit* and the controller is *ProductsGroupsEditController* and 
the template is *products-groups-edit.html*:

```html
<div class="panel panel-default">
    <div class="panel-body">
    <products-group ng-repeat="item in productsGroups" data="item"
                               delete="onDeleteClick({index:$index})"
                               edit="onEditClick({index:$index})"></products-group>
    </div>
</div>
```
The above creates a list of *product groups* and each has buttons *edit* and *delete*. Now all the operations are to be designed 
in this one page.


## products discussion ##

These are controllers related to *products* thing:
```javascript

		$routeProvider.when('/products-area',{
				templateUrl:'/admin/a/products-area.html',
                                controller:'ProductsAreaController'});
		$routeProvider.when('/products-menu',{
				templateUrl:'/admin/a/products-menu.html',
                                controller:'ProductsMenuController'});
		$routeProvider.when('/products-edit',{
				templateUrl:'/admin/a/products-edit.html',
                                controller:'ProductsEditController'});
		$routeProvider.when('/new-product',{
				templateUrl:'/admin/a/new-product.html',
                                controller:'NewProductController'});

```
And the routes are these:

1. products-area
2. products-menu
3. products-edit
4. new-product

Navbar gives these routes:
```html
<ul class="nav navbar-nav">
	<li><a href="#" >Home</a></li>
	<li><a href="#/products-area" >Products</a></li>
	<li><a href="#/employees" >Employees</a></li>
	<li><a href="#/settings" >Settings</a></li>
</ul>
```
So _product-area_ is the route that will take you to the *ProductAreaController*

This is the *product-area.html* template:

```html
<div class="panel panel-default">
    <div class="panel-body">
        <p>Clicking this link you can access the products menu:</p>
        <a href="#/products-menu">Products</a>
    </div>

</div>

<div class="panel panel-default">
    <div class="panel-body">
        <p>Clicking this link you can access the products groups menu:</p>
        <a href="#/products-groups">Products Groups</a>
    </div>

</div>
```
In the above the first route is *products-menu*.

And this takes to *ProductsMenuController* and template is *products-menu.html*:

```html
<div class="panel panel-default">
    <div class="panel-body">
        <p>Clicking this link you can update the products:</p>
        <a href="#/products-edit">Products Update</a>
    </div>

</div>

<div class="panel panel-default">
    <div class="panel-body">
        <p>Clicking this link you can access the new product:</p>
        <a href="#/new-product">New Product</a>
    </div>

</div>
```
One of the route in the above is *products-edit* and the template for it is *products-edit.html*.

