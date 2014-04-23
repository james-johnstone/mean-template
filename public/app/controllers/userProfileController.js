angular.module('app').controller('userProfileController', function ($scope, authService, identity, appNotifier) {

    $scope._id = identity.currentUser._id;
    $scope.email = identity.currentUser.local.email;
    $scope.firstName = identity.currentUser.local.firstName;
    $scope.lastName = identity.currentUser.local.lastName;
    $scope.userName = identity.currentUser.local.userName;

    $scope.update = function () {
        var newUserData = {
            _id : $scope._id,
            local :{
                email: $scope.email,
                firstName: $scope.firstName || "",
                lastName: $scope.lastName || "",
                userName: $scope.userName
            }};

        authService.updateUser(newUserData).then(function () {
            appNotifier.notify('Your profile has been successfully updated', true);
        }, function (reason) {
            appNotifier.notify(reason, false);
        });

    }
})