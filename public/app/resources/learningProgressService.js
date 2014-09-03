angular.module('app').factory('learningProgressService', function ($resource) {

    var learningProgressResource = $resource('/api/learningProgress/:id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });
    return learningProgressResource;
})

angular.module('app').factory('learningProgressResource', function ($http, identity, $q, learningProgressService) {
    return {
        updateLearningProgress: function (learningProgressData) {
            var defer = $q.defer();
            var clone = new learningProgressService();

            angular.extend(clone, learningProgressData);

            clone.$update().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        createLearningProgress: function (learningProgressData) {

            var newLearningProgress = new learningProgressService(learningProgressData);
            var defer = $q.defer();

            newLearningProgress.$save().then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        },
        deleteLearningProgress: function (learningProgress) {
            var defer = $q.defer();
            var clone = new learningProgressService();

            angular.extend(clone, learningProgress);

            clone.$delete({ id: learningProgress._id }).then(function () {
                defer.resolve();
            }, function (response) {
                defer.reject(response.data.reason);
            });
            return defer.promise;
        }
    };
})