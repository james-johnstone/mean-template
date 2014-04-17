angular.module('app').controller('adminWordsController', function ($scope, wordService, wordResource, $location, appNotifier) {

    $scope.words = wordService.query();

    $scope.sortOptions = [{ value: "word", text: "sort by word" }, { value: "rootLanguage", text: "sort by root" }];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.editWord = function (word) {
        $location.path("/admin/words/" + word._id);
    };

    $scope.createWord = function () {
        $location.path("/admin/words/new");
    };

    $scope.deleteWord = function (word) {
        wordResource.deleteWord(word).then(function () {
            $scope.words.splice($scope.words.indexOf(word), 1);
            appNotifier.notify('Word successfully deleted', true);
        }, function (reason) {
            appNotifier.notify(reason, false);
        });
    };
})