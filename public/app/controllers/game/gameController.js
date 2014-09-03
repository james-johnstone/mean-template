angular.module('app').controller('gameController', function ($scope, wordService, languageService, userLearningProgressService, identity, learningProgressResource, $timeout, $animate) {

    $scope.wordScore = 20;
    $scope.gameScore = 0;
    $scope.rootsIsHidden = false;
    $scope.learningProgres = [];

    $scope.user = identity.currentUser;    
    if (!!$scope.user)
        $scope.learningProgress = userLearningProgressService.get({ id: $scope.user._id });

    $scope.words = wordService.query(function (words) {
        $scope.languages = languageService.query(function (languages) {
                $scope.resetGameWord(words);
        });
    });

    $scope.resetGameWord = function (words) {
        $scope.wordIsAnswered = false;
        $scope.wordScore = 20;

        $scope.gameWords = words.concat();
        $scope.gameLanguages = $scope.languages.concat();

        $scope.activeWord = $scope.getRandomElement($scope.gameWords); 
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

        $scope.similarRoot = $scope.getRandomElement($scope.similarRoots);
        $scope.gameLanguages.splice($scope.gameLanguages.indexOf($scope.similarRoot, 1));
        $scope.randomRoot = $scope.getRandomElement($scope.gameLanguages);

        $scope.languageTempArray = [];
        $scope.languageTempArray.push($scope.rootLanguage);
        $scope.languageTempArray.push($scope.similarRoot);
        $scope.languageTempArray.push($scope.randomRoot);

        $scope.possibleLanguages = $scope.randomizeLanguageArray($scope.languageTempArray);
        $scope.currentWordIndex = $scope.words.length - $scope.gameWords.length;

        if (!!$scope.user){
            $scope.activeLearningProgress = $scope.getLearningProgress($scope.activeWord); 
            $scope.UpdateLearningProgress($scope.activeLearningProgress);
        }
    };

    $scope.nextGameWord = function () {
        if ($scope.gameWords.length > 0) {
            $scope.resetGameWord($scope.gameWords);
        }
        else {
            $scope.resetGameWord($scope.words);
            $scope.gameScore = 0;
        }
    };

    $scope.selectRoot = function (root) {
        root['rootIsSelected'] = !root['rootIsSelected'];

        if ($scope.activeWord.rootLanguage._id !== root._id) {
            $scope.wordScore -= 10;
        }
        else {
            $scope.gameScore += $scope.wordScore;
            $scope.UpdateLearningProgressAnswered($scope.activeLearningProgress);
            $timeout($scope.fadeToEty, 1000);
        }
    };

    $scope.fadeToEty = function () {
        $scope.wordIsAnswered = true;

        $timeout($scope.nextGameWord, 3000);
    };

    $scope.getRandomElement = function (array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    $scope.randomizeLanguageArray = function (array) {

        var newArray = [];

        for (i = 0; i < 3; i++) {
            var element = $scope.getRandomElement(array);
            array.splice(array.indexOf(element), 1);

            element['rootIsSelected'] = false;
            newArray.push(element);            
        }

        return newArray;
    };

    $scope.getLearningProgress = function (word) {
        if (!!$scope.learningProgress) {
            return $scope.learningProgress.filter(function (progress) {
                return progress.word == word._id;
            })[0] || $scope.createNewLearningProgress();;
        }
        return $scope.createNewLearningProgress();
    }

    $scope.createNewLearningProgress = function(){
        var progress = {
            word: $scope.activeWord._id,
            user: $scope.user._id,
            timesSeen: 0,
            correctAnswers: 0,    
        };
        learningProgressResource.createLearningProgress(progress);
        $scope.learningProgress.push(progress);
        return progress;
    }

    $scope.UpdateLearningProgress = function (learningProgress) {
        learningProgress.timesSeen++;
        learningProgressResource.updateLearningProgress(learningProgress);
    };

    $scope.UpdateLearningProgressAnswered = function (learningProgress) {
        learningProgress.correctAnswers++;
        learningProgressResource.updateLearningProgress(learningProgress);
    };
});

angular.module('app').directive('flip', function ($animate) {
    return function (scope, element, attrs) {
        scope.$watch(attrs.flip, function (newVal) {
            if (newVal) {
                $animate.addClass(element, "rotate-3d");               
            }
            else {
                $animate.removeClass(element, "rotate-3d");                
            }
        });
    };
});

angular.module('app').directive('fadeOut', function ($animate) {
    return function (scope, element, attrs) {
        scope.$watch(attrs.fadeOut, function (newVal) {
            if (newVal) {
                $animate.addClass(element, "fadeOutFast");
            }
            else {
                $animate.removeClass(element, "fadeOutFast");
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