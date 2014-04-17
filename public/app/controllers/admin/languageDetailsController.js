angular.module('app').controller('languageDetailsController', function ($scope, languageService, languageResource, $routeParams, appNotifier, $location) {

    if (!!$routeParams.id) {
        $scope.language = languageService.get({ id: $routeParams.id });
    }

    $scope.update = function () {

        if (!!$routeParams.id) {
            languageResource.updateLanguage($scope.language).then(function () {
                $location.path('/admin/languages')
                appNotifier.notify('Language details successfully updated', true);
            }, function (reason) {
                appNotifier.notify(reason, false);
            });
        }

        else {
            languageResource.createLanguage($scope.language).then(function () {
                $location.path('/admin/languages')
                appNotifier.notify('Language successfully created', true);
            }, function (reason) {
                appNotifier.notify(reason, false);
            });
        }
    };
})