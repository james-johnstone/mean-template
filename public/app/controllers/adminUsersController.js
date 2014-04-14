angular.module('app').controller('adminUsersController', function ($scope, userService) {
    $scope.users = userService.query();
});