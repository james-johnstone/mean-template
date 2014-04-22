angular.module('app').controller('mainController', function ($scope, $location) {
    $scope.launchGame = function(){
        $location.path('/play');
    }
});