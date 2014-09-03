angular.module('app').factory('userLearningProgressService', function ($resource) {

    var userLearningProgressResource = $resource('/api/user/learningProgress/:id', { _id: "@id" },
         { 'get': { method: 'GET', isArray: true } });
    return userLearningProgressResource;
})
