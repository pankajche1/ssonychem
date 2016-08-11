'use-strict()';
module.exports=['$rootScope','$scope','$http', function($rootScope,$scope, $http){

    $scope.message="this is our products list";
    var products=['washing powder', 'toilet cleaner', 'liquid dishwash', 'hand wash', 'phenyl (germ killer)', 
                    'glass cleaner', 'floor cleaner', 'degreaser', 'over cleaner', 'oxy bleach',
                     'fabric softner', 'car wash'];
    $scope.products = products;
}];


