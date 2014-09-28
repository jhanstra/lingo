module.exports = function($rootScope, $scope, $location, Definition, Word) {
  $rootScope.search_term = "";
  $scope.definitions = Definition.all;
  $scope.definition = {
    word_id:"",
    word:"",
    content:"",
    user_id:"",
    namespace:[],
    isGlobal:"",
    upvotes:"",
    downvotes:"",
    created_at:""
  };
  $scope.words = Word.all;
  $scope.word = {
    content:"",
    part_of_speech:"",
    pronounciation:"",
    synonyms:[""],
    anotnyms:[""],
    rhymes:[""],
    cover_photo:"",
    words_of_same_spelling:[""],
    language:"english",
    prereq_words:[""],
    related_words:[""],
    created_at:"",
    inventor:"",
    recognized:"",
    top_definition:""
  };

  $scope.submitDefinition = function () {
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

  $scope.selected_index = 0;
  $scope.word_search = false;

  $scope.selectWord = function(word) {
    // var word = $scope.words[$index];
    $scope.definition.word = word.content;
    $scope.word_search = false;
  }

  $scope.tabNext = function (e) {
    if (e.which == 9) {
      e.preventDefault();
      $scope.selected_index++;
      $scope.word_search = false;
    }
    if (e.which == 40) {
      e.preventDefault();
      $scope.selected_index++;
    }
    if (e.which == 38) {
      e.preventDefault();
      $scope.selected_index--;
    }
    if (e.which == 13) {
      $scope.definition.word = word.content;
    }
  }
};
