angular.module('app').controller('gameController', function ($scope, wordService, languageService, $timeout, $animate) {

    $scope.wordIsLoading = false;

    $scope.words = wordService.query(function (words) {
        $scope.languages = languageService.query(function (languages) {
            $scope.resetGameWord(words);
        });
    });

    $scope.resetGameWord = function (words) {
        $scope.wordIsAnswered = false;
        $scope.gameWords = words.concat();
        $scope.gameLanguages = $scope.languages.concat();

        $scope.activeWord = $scope.gameWords[Math.floor(Math.random() * $scope.gameWords.length)];
        $scope.gameWords.splice($scope.gameWords.indexOf($scope.activeWord), 1);

        $scope.rootLanguage = $scope.activeWord.rootLanguage;
        $scope.rootLanguage['isRoot'] = true;

        $scope.possibleLanguages = [];

        $scope.gameLanguages = $scope.gameLanguages.filter(function (language) {
            return language._id !== $scope.activeWord.rootLanguage._id;
        });
        $scope.similarRoots = $scope.gameLanguages.filter(function (language) {
            return language.languageCategory === $scope.activeWord.rootLanguage.languageCategory;
        });

        $scope.similarRoot = $scope.similarRoots[Math.floor(Math.random() * $scope.similarRoots.length)];
        $scope.gameLanguages.splice($scope.gameLanguages.indexOf($scope.similarRoot, 1));
        $scope.randomRoot = $scope.gameLanguages[Math.floor(Math.random() * $scope.gameLanguages.length)];

        $scope.rootLanguage['rootIsSelected'] = false;
        $scope.similarRoot['rootIsSelected'] = false;
        $scope.randomRoot['rootIsSelected'] = false;        

        $scope.possibleLanguages.push($scope.rootLanguage);
        $scope.possibleLanguages.push($scope.similarRoot);
        $scope.possibleLanguages.push($scope.randomRoot);        

        $scope.currentWordIndex = $scope.words.length - $scope.gameWords.length;
    };

    $scope.nextGameWord = function () {
        $scope.wordIsLoading = true;
        $timeout($scope.enableNextWord, 2000);
        if ($scope.gameWords.length > 0) {
            $scope.resetGameWord($scope.gameWords);
        }
        else {
            $scope.resetGameWord($scope.words);
        }
    };

    $scope.enableNextWord = function () {
        $scope.wordIsLoading = false;
    };

    $scope.selectRoot = function (root) {
        root['rootIsSelected'] = !root['rootIsSelected'];

        if ($scope.activeWord.rootLanguage._id !== root._id) {
            console.log('wrong root picked!');
        }
        else {
            $timeout($scope.fadeToEty, 1000);            
            console.log('correct root picked!');
        }
    };

    $scope.rootsIsHidden = false;

    $scope.fadeToEty = function () {
        $scope.wordIsAnswered = true;
    };

});

angular.module('app').directive('flip', function ($animate) {
    return function (scope, element, attrs) {
        scope.$watch(attrs.flip, function (newVal) {
            if (newVal) {
                $animate.addClass(element, "rotate-3d");
                event.preventDefault();
            }
            else {
                $animate.removeClass(element, "rotate-3d");
                event.preventDefault();
            }
        });
    };
});

angular.module('app').directive('fadeOut', function ($animate) {
    return function (scope, element, attrs) {
        scope.$watch(attrs.fadeOut, function (newVal) {
            if (newVal) {
                $animate.addClass(element, "fade");
            }
            else {
                $animate.removeClass(element, "fade");
            }
        });
    };
});

angular.module('app').animation(".fade", function () {
    return {
        addClass: function (element, className) {
            TweenMax.to(element, 1, { opacity: 0 });
        },        
        removeClass: function (element, className) {
            TweenMax.to(element, 1, { opacity: 1 });
        }
    }
});