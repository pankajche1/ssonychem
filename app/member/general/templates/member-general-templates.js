!function(e){try{e=angular.module("TemplatesMemberGeneral")}catch(a){e=angular.module("TemplatesMemberGeneral",[])}e.run(["$templateCache",function(e){e.put("/member/general/templates/about-us.html","<div><p>about us</p></div>")}])}(),function(e){try{e=angular.module("TemplatesMemberGeneral")}catch(a){e=angular.module("TemplatesMemberGeneral",[])}e.run(["$templateCache",function(e){e.put("/member/general/templates/contact-us.html","<div><p>Contact us</p></div>")}])}(),function(e){try{e=angular.module("TemplatesMemberGeneral")}catch(a){e=angular.module("TemplatesMemberGeneral",[])}e.run(["$templateCache",function(e){e.put("/member/general/templates/nav-wrapper.html",'<pnav><p-nav-item page="#" label="page1"></p-nav-item><p-nav-item page="#" label="page2"></p-nav-item><p-nav-item page="#" label="page3"></p-nav-item><p-nav-item page="#" label="page4"></p-nav-item></pnav>')}])}(),function(e){try{e=angular.module("TemplatesMemberGeneral")}catch(a){e=angular.module("TemplatesMemberGeneral",[])}e.run(["$templateCache",function(e){e.put("/member/general/templates/product-item.html",'<div style="height:40px;border-bottom:#bbc 1px solid;margin-bottom:5px;clear:both"><span style="font-weight:bold"><% product.name %></span></div>')}])}(),function(e){try{e=angular.module("TemplatesMemberGeneral")}catch(a){e=angular.module("TemplatesMemberGeneral",[])}e.run(["$templateCache",function(e){e.put("/member/general/templates/products-group-item.html",'<div class="panel panel-default"><div class="panel-body"><h3><a style="text-decoration:none;color:#555" href="#/products-group/<% group.key %>"><% group.name %></a></h3></div></div>')}])}(),function(e){try{e=angular.module("TemplatesMemberGeneral")}catch(a){e=angular.module("TemplatesMemberGeneral",[])}e.run(["$templateCache",function(e){e.put("/member/general/templates/products-group.html",'<!-- this is used to show a particular group and the products with it --><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><% data.group.name %></h3></div><div class="panel-body"><h4 style="border-bottom:green 1px dotted">Products</h4><p><% data.message %></p><product-item ng-repeat="item in data.group.products" product="item"></div><div></div></div>')}])}(),function(e){try{e=angular.module("TemplatesMemberGeneral")}catch(a){e=angular.module("TemplatesMemberGeneral",[])}e.run(["$templateCache",function(e){e.put("/member/general/templates/products-groups.html",'<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Our Products Range</h3></div><div class="panel-body"><div><% data.message %></div><products-group-item ng-repeat="item in data.groups" group="item"></products-group-item></div></div>')}])}(),function(e){try{e=angular.module("TemplatesMemberGeneral")}catch(a){e=angular.module("TemplatesMemberGeneral",[])}e.run(["$templateCache",function(e){e.put("/member/general/templates/products.html",'<div><products-groups data="data"></div>')}])}(),function(e){try{e=angular.module("TemplatesMemberGeneral")}catch(a){e=angular.module("TemplatesMemberGeneral",[])}e.run(["$templateCache",function(e){e.put("/member/general/templates/welcome.html",'<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">About Us</h3></div><div class="panel-body"><h2>SSonyChem Industries Private Limited</h2><p>Dhakwa, Pratapgarh</p></div></div>')}])}();