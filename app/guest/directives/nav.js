'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    scope: {
		    items: '='

	    },
	    transclude: true,
	    controller:['$scope','$element',function($scope, $element){
		    var items = $scope.items = [];
		    $scope.toggle = function(item){
                            $scope.isActive = !$scope.isActive;
		    };

		    //console.log('in nav2 controller');
		    $scope.select = function(item){
			    //console.log('in select()');
			    
			    angular.forEach(items, function(item){
				    item.selected = false;
			    });
			    item.selected = true;
			   
		    };
		    this.addItem = function(item){
			    // this line is for selecting the first element:
			    // but I disable it to select the first.
			    //if(!items.length) $scope.select(item);
			    //console.log('got item:'+item.label);
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
			    return false;
		    }else{
			    // comes here when button is not visible
			    $scope.isActive=false;
			    return false;
		    }


		    //console.log('in nav2 link');
	    },
	    templateUrl:'/guest/nav.html'
    };


}];
