module.exports = function($rootScope, $scope, $location, Definition, Word) {
  $scope.definitions = Definition.all;
  $scope.definition = {
    wordId:"",
    word:"",
    content:"",
    userId:"",
    namespace:[],
    isGlobal:"",
    upvotes:"",
    downvotes:"",
    createdAt:""
  };
  $scope.words = Word.all;
  $scope.word = {
    content:"",
    partOfSpeech:"",
    pronounciation:"",
    synonyms:[""],
    antonyms:[""],
    rhymes:[""],
    coverPhoto:"",
    wordsOfSameSpelling:[""],
    language:"english",
    prereqWords:[""],
    relatedWords:[""],
    createdAt:"",
    inventor:"",
    recognized:"",
    topDefinition:""
  };

  $scope.testTesting = "hi jared";
  $scope.submitDefinition = function () {
    // for ( var word in $scope.words ) {
    //   if ( $scope.definition.word !==)
    // }
    // if ($scope.definition.word)
    Definition.create($scope.definition).then(function () {
      $scope.definition = {};
    });
  };
  $scope.deleteDefinition = function (definition) {
    Definition.delete(definition);
  };

  $scope.submitWord = function () {
    Word.create($scope.word).then(function () {
      $scope.word = {content:''};
    });
  };
  $scope.deleteWord = function (word) {
    Word.delete(word);
  };

  $scope.selectedIndex = 0;
  $scope.wordSearch = false;

  $scope.selectWord = function(word) {
    // var word = $scope.words[$index];
    $scope.definition.word = word.content;
    $scope.wordSearch = false;
  }

  $scope.tabNext = function (e) {
    if (e.which == 9) {
      e.preventDefault();
      $scope.selectedIndex++;
      $scope.wordSearch = false;
    }
    if (e.which == 40) {
      e.preventDefault();
      $scope.selectedIndex++;
    }
    if (e.which == 38) {
      e.preventDefault();
      $scope.selectedIndex--;
    }
    if (e.which == 13) {
      $scope.definition.word = word.content;
    }
  }
};
