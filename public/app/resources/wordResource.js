angular.module('app').factory('wordResource', function ($http, identity, $q, wordService) {
    return {
        updateWord: function (wordData) {
            var defer = $q.defer();
            var clone = new wordService();

            angular.extend(clone, wordData);

            clone.$update().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        }
    };
})