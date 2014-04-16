angular.module('app').factory('wordService', function ($resource) {

    var WordResource = $resource('/api/words/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });
    return WordResource;
})