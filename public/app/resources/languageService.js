angular.module('app').factory('languageService', function ($resource) {
    var languageResources = $resource('/api/languages/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });

    return languageResources;
})