angular.module('app').controller('adminUsersController', function ($scope, userService) {
    $scope.users = userService.query();

    $scope.sortOptions = [{ value: "email", text: "sort by email" }, { value: "userName", text: "sort by username" }];

    $scope.sortOrder = $scope.sortOptions[0].value;
});