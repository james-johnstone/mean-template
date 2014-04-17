angular.module('app').factory('languageService', function ($resource) {

    var languageResources = $resource('/api/languages/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });
    return languageResources;
})

angular.module('app').factory('languageResource', function ($http, identity, $q, languageService) {
    return {
        updateLanguage: function (languageData) {
            var defer = $q.defer();
            var clone = new languageService();

            angular.extend(clone, languageData);

            clone.$update().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        createLanguage: function (languageData) {

            var newLanguage = new languageService(languageData);
            var defer = $q.defer();

            newLanguage.$save().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        deleteLanguage: function (language) {
            var defer = $q.defer();
            var clone = new languageService();

            angular.extend(clone, language);

            clone.$delete({id: language._id}).then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        }
    };
})