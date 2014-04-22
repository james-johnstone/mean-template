angular.module('app').controller('languagesController', function ($scope, languageService, languageResource, $location, appNotifier) {

    $scope.languages = languageService.query();
    $scope.sortOptions = [{ value: "name", text: "sort by language" }, { value: "languageCategory", text: "sort by category" }];
    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.currentPage = 0;
    $scope.pageSize = 10;

    $scope.numberOfPages = function () {
        return Math.ceil($scope.languages.length / $scope.pageSize);
    }

    $scope.editLanguage = function (language) {
        $location.path("/admin/languages/" + language._id);
    };

    $scope.createLanguage = function () {
        $location.path("/admin/languages/new");
    };

    $scope.deleteLanguage = function (language) {
        languageResource.deleteLanguage(language).then(function () {            
            $scope.languages.splice($scope.languages.indexOf(language), 1);
            appNotifier.notify('Language successfully deleted', true);
        }, function (reason) {
            appNotifier.notify(reason, false);
        });
    };
})