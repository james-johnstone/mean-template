angular.module('app').controller('authController', function ($scope, $http, identity, appNotifier) {

    $scope.identity = identity;

    $scope.login = function (email, password) {
        $http.post('/login', { email: email, password: password }).then(function (response) {
            if (response.data.success) {
                identity.currentUser = response.data.user;
                appNotifier.notify('You have sucessfully logged in', true);
            }
            else {
                appNotifier.notify('invalid email / password', false);
            }
        });
    }
});