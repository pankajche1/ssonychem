!function(a){try{a=angular.module("TemplatesCommon")}catch(e){a=angular.module("TemplatesCommon",[])}a.run(["$templateCache",function(a){a.put("/common/templates/header-middle-bar.html",'<div class="header-middle-bar"><div class="container"><div style="padding:0 15px"><div id="company-name">SSonyChem</div><p>Greener Chemistry</p></div></div></div>')}])}(),function(a){try{a=angular.module("TemplatesCommon")}catch(e){a=angular.module("TemplatesCommon",[])}a.run(["$templateCache",function(a){a.put("/common/templates/header-top-bar.html",'<div class="header-top-bar"><div class="container"><ul class="header-top-bar-nav"><li ng-repeat="item in data.menuItems"><a href="<% item.href  %>"><% item.label %></a></li></ul></div><!-- container fluid --></div><!-- header top bar -->')}])}(),function(a){try{a=angular.module("TemplatesCommon")}catch(e){a=angular.module("TemplatesCommon",[])}a.run(["$templateCache",function(a){a.put("/common/templates/nav.html",'<nav class="navbar navbar-default"><div class="container"><!-- Brand and toggle get grouped for better mobile display --><div class="navbar-header"><button type="button" ng-click="toggle()" class="navbar-toggle collapsed"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button><div class="navbar-brand" href="#">SSonyChem</div></div><!-- Collect the nav links, forms, and other content for toggling --><div class="collapse navbar-collapse" ng-class="{isActive:isActive}"><ul class="nav navbar-nav"><li ng-repeat="item in items" ng-class="{active:item.selected}"><a href="<% item.page %>" ng-click="select(item)"><% item.label %></a></li></ul><div ng-transclude></div></div><!-- /.navbar-collapse --><div class="menu-mask" ng-click="toggle()" ng-class="{isActive:isActive}"></div></div><!-- /.container-fluid --></nav>')}])}();