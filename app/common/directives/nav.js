'use-strict()';
common.directive('pnav', [function(){
  return{
    restrict: 'E',
    scope: {
      items: '='

    },
    transclude: true,
    controller:['$scope','$element', '$rootScope', function($scope, $element, $rootScope){
      var items = $scope.items = [];
      $scope.toggle = function(){
        $scope.isActive = !$scope.isActive;
        if($scope.isMobile==true){
          if($scope.isActive){
            // this line gives error
            //document.body.addClass("has-active-menu");
            $rootScope.hasActiveMenu="has-active-menu";
            //$element.find(document.querySelector(body)).addClass("has-active-menu");
          }else{
            $rootScope.hasActiveMenu="no-active-menu";
            //$element.find(document.querySelector(body)).removeClass("has-active-menu");
          }
        }
      };//toggle
      $scope.toggleSelect = function(item){
        $scope.toggle();
	angular.forEach(items, function(item){
	  item.selected = false;
	});
	item.selected = true;
        
      };

      //console.log('in nav2 controller');
      $scope.select = function(item){
	//console.log('in select()');
	
	angular.forEach(items, function(item){
	  item.selected = false;
	});
	item.selected = true;
	
      };
      this.addItem = function(item){// 'item' passed here is actually '$scope' from the nav-item directive.
        //from there we have $scope.page, $scope.label, and $scope.isMobile; the last 'isMobile' can be undefined for some elements
        //+ so test for the above.
	// this line is for selecting the first element:
	// but I disable it to select the first.
	//if(!items.length) $scope.select(item);
	// console.log('got item:'+item.label);
        // in case some additional data is inserted in the nav item tag:
        // data will written with one attribute: 'url' and it will be set for its 'page'
        if(item.data!=undefined){
          item.page = item.data.url;
        }
        if(item.ismobile==undefined) item.ismobile=false;
	item.select=function(id){
	  //console.log('i am clicked.'+id);
	  //console.log('i am clicked.');
	  angular.forEach(items, function(item){
	    if(item.id==id)
	      item.selected = true;
	    else
	      item.selected = false;
	  });

	};
	items.push(item);
	item.id=items.length;
      };
    }],//controller
    //repeat:false,

    link: function ($scope, element, attrs) {

      function isVisible(elem){
	return elem && elem.style.display!='none' && elem.offsetWidth && elem.offsetHeight;
      }
      $scope.isCollapse=false;
      var btn = element.find('button');

      if(isVisible(btn[0])){
	//comes here when btn is visible
        // means this the mobile screen
	$scope.isActive=false;
        $scope.isMobile=true;
	return false;
      }else{
	// comes here when button is not visible
	$scope.isActive=false;
        $scope.isMobile=false;
	return false;
      }


      //console.log('in nav2 link');
    },
    templateUrl:'/common/templates/nav.html'
  };


}]);
