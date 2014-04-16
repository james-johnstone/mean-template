angular.module('app').controller('adminWordsController', function ($scope, wordService, $location) {

    $scope.words = wordService.query();

    $scope.sortOptions = [{ value: "word", text: "sort by word" }, { value: "rootLanguage", text: "sort by root" }];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.editWord = function (word) {
        $location.path("/admin/words/" + word._id);
    };
})