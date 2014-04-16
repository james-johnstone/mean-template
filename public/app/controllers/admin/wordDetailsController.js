angular.module('app').controller('wordDetailsController', function ($scope, wordService, languageService, $routeParams, wordResource, appNotifier, $location) {

    $scope.languages = languageService.query();

    $scope.word = wordService.get({ id: $routeParams.id });

    $scope.update = function() {
        wordResource.updateWord($scope.word).then(function () {
            $location.path('/admin/words')
            appNotifier.notify('Word details successfully updated', true);
        }, function (reason) {
            appNotifier.notify(reason, false);
        });
    };

})