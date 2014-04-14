angular.module('app').factory('authService', function ($http, identity, $q) {
    return {
        authenticateUser: function (email, password) {
            var defer = $q.defer();

            $http.post('/login', { email: email, password: password }).then(function (response) {
                if (response.data.success) {
                    identity.currentUser = response.data.user;
                    defer.resolve(true);
                }
                else {
                    defer.resolve(false);
                }
            });
            return defer.promise;
        },
        logoutUser: function () {
            var defer = $q.defer();
            $http.post('/logout', { logout: true }).then(function () {
                identity.currentUser = undefined;
                defer.resolve();
            });
            return defer.promise;
        }
    }
})