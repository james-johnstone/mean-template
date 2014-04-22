angular.module('app').controller('adminUsersController', function ($scope, $location, userService) {

    $scope.users = userService.query();
    $scope.sortOptions = [{ value: "email", text: "sort by email" }, { value: "userName", text: "sort by username" }];
    $scope.sortOrder = $scope.sortOptions[0].value

    $scope.currentPage = 0;
    $scope.pageSize = 10;

    $scope.numberOfPages = function () {
        return Math.ceil($scope.users.length / $scope.pageSize);
    }

    $scope.editUser = function (user) {
        $location.path("/admin/users/" + user._id);
    };
});