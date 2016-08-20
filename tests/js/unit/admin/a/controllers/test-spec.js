/* step 1
(function () {
'use strict()';
    // main describe
    describe('A test for learning angulerjs tests', function () {


    });//main describe 
}());
Step 2:
(function () {
'use strict()';
    // main describe
    describe('A test for learning angulerjs tests', function () {
        beforeEach(module('app'));
    });//main describe 
}());
step 3:
(function () {
'use strict()';
    // main describe
    describe('A test for learning angulerjs tests', function () {
        beforeEach(module('app'));
        it('should do sth', inject());//it
    });//main describe 
}());
step 4:
(function () {
'use strict()';
    // main describe
    describe('A test for learning angulerjs tests', function () {
        beforeEach(module('app'));
        it('should do sth', inject(function(){}));//it
    });//main describe 
}());
step 5:
(function () {
'use strict()';
    // main describe
    describe('A test for learning angulerjs tests', function () {
        beforeEach(module('app'));
        it('should do sth', inject(function(){



       }));//it
    });//main describe 
}());
step 6:
(function () {
'use strict()';
    // main describe
    describe('A test for learning angulerjs tests', function () {
        beforeEach(module('app'));
        it('should do sth', inject(function($controller){



       }));//it
    });//main describe 
}());
step 7:
(function () {
'use strict()';
    // main describe
    describe('A test for learning angulerjs tests', function () {
        beforeEach(module('app'));
        it('should do sth', inject(function($controller){
            var $scope = {}
            ctrl = $controller('EmployeeController', {$scope:$scope});


       }));//it
    });//main describe 
}());
*/
(function () {
'use strict()';
    // main describe
    describe('A test for learning angulerjs tests', function () {
        var ctrl, $scope;
        beforeEach(module('app'));
        beforeEach(inject(function($controller){
            $scope = {}
            ctrl = $controller('EmployeesController', {$scope:$scope});
        }));
        it('should do sth', inject(function($controller){
            expect(ctrl).not.toBe(null);
	    expect(ctrl).not.toBe(undefined);
       }));//it 1
        it('should do have 3 employees', inject(function($controller){
            expect($scope.employees.length).toBe(3);
            expect($scope.employees[0].name).toBe("Shri Pankaj Kumar Lodhi");
       }));//it 2
    });//main describe 
}());
