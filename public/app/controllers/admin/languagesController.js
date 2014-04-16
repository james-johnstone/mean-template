angular.module('app').controller('languagesController', function ($scope, languageService, $location) {
    $scope.languages = languageService.query();

    $scope.sortOptions = [{ value: "name", text: "sort by language" }, { value: "languageCategory", text: "sort by category" }];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.editLanguage = function (language) {
        $location.path("/admin/languages/" + language._id);
    };
})