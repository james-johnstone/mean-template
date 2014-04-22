angular.module('app').controller('gameController', function($scope, wordService, languageService, $timeout){

    $scope.words = wordService.query(function(words){
        $scope.languages = languageService.query(function(languages){
            $scope.resetGameWord(words);
        });
    });

    $scope.resetGameWord = function(words){
        $scope.gameWords = words.concat();
        $scope.gameLanguages = $scope.languages.concat();

        $scope.activeWord = $scope.gameWords[Math.floor(Math.random() * $scope.gameWords.length)];
        $scope.gameWords.splice($scope.gameWords.indexOf($scope.activeWord),1);

        $scope.rootLanguage = $scope.activeWord.rootLanguage;
        $scope.rootLanguage['isRoot'] = true;

        $scope.possibleLanguages = [];

        $scope.gameLanguages = $scope.gameLanguages.filter(function (language) {
            return language._id !== $scope.activeWord.rootLanguage._id;
        });
        $scope.similarRoots =  $scope.gameLanguages.filter(function (language) {
            return language.languageCategory === $scope.activeWord.rootLanguage.languageCategory;
        });

        $scope.similarRoot =  $scope.similarRoots[Math.floor(Math.random() * $scope.similarRoots.length)];
        $scope.gameLanguages.splice($scope.gameLanguages.indexOf($scope.similarRoot,1));
        $scope.randomRoot = $scope.gameLanguages[Math.floor(Math.random() * $scope.gameLanguages.length)];

        $scope.possibleLanguages.push($scope.rootLanguage);
        $scope.possibleLanguages.push($scope.similarRoot);
        $scope.possibleLanguages.push($scope.randomRoot);
    };

    $scope.nextGameWord = function(){
        if ($scope.gameWords.length > 0){
            $scope.resetGameWord($scope.gameWords);}
        else{
            $scope.resetGameWord($scope.words);
        }
    };

    $scope.selectRoot = function(root){
        var toggleClass = '.' + root._id;
        if ($scope.activeWord.rootLanguage._id !== root._id){
            //$(toggleClass).toggleClass('wrong-card');
            console.log('wrong root picked!');
        }
        else{
            console.log('correct root picked!');
            $timeout($scope.nextGameWord, 3000);
        }

        $(toggleClass).toggleClass('rotate-3d');
        event.preventDefault();
    };

    $scope.flip = function(root){
        var toggleClass = '.' + root._id;
        $(toggleClass).toggleClass('rotate-3d');
        event.preventDefault();
    };
})