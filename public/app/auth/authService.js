angular.module('app').factory('authService', function ($http, identity, $q, userService) {
    return {
        authenticateUser: function (email, password) {
            var defer = $q.defer();

            $http.post('/login', { email: email, password: password }).then(function (response) {
                if (response.data.success) {
                    var user = new userService();
                    angular.extend(user, response.data.user);
                    identity.currentUser = user;
                    defer.resolve(true);
                }
                else {
                    defer.resolve(false);
                }
            });
            return defer.promise;
        },

        createUser: function (newUserData) {
            var newUser = new userService(newUserData);
            var defer = $q.defer();

            newUser.$save().then(function () {
                identity.currentUser = newUser;
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
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
        },

        authorizeCurrentUserForRole: function (role) {
            if (identity.isAuthorized(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
})