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
			    //console.log('in toggle()');
			    if($scope.isActive===false)
				$scope.isActive=true;
			    else
				 $scope.isActive=false;
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
                    $scope.isActive = false;//nav bar default
		    var btn = element.find('button');
                    // function(e){e.preventDefault()}

		    if(isVisible(btn[0])){
			    //comes here when btn is visible
                            // as in the case of mobile
			    $scope.isCollapse=true;
                            $scope.isActive = false;
			    return false;
		    }else{
			    // comes here when button is not visible as in case of desktop. 
                            // so here no meaning of it
			    $scope.isCollapse=false;
                            $scope.isActive = false;
			    return false;
		    }


		    //console.log('in nav2 link');
	    },
	    templateUrl:'/admin/a/nav.html'
    };


}];
