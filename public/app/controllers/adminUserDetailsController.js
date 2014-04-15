angular.module('app').controller('adminUserDetailsController', function ($scope, userService, $routeParams) {
    $scope.user = userService.get({ id: $routeParams.id });

    $scope.addRole = function () {
        if ($scope.user.roles.indexOf("") === -1)
            $scope.user.roles.push("");
    };

    $scope.removeRole = function (index) {
        $scope.user.roles.splice(index, 1);
    };
});