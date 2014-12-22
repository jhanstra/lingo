module.exports = function($rootScope, $scope, $location, Definition, Word, User) {

  $scope.addType = 'definition';

  $scope.definition = {
    wordId:"",
    word:"",
    content:"",
    authorId:"",
    author:"",
    dictionaries:[],
    isGlobal:"",
    upvotes:"",
    downvotes:"",
    createdAt:""
  };
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
  $scope.dictionary = {
  };

  $scope.submitDefinition = function () {
    // for ( var word in $scope.words ) {
    //   if ( $scope.definition.word !==)
    // }
    // if ($scope.definition.word)
    $scope.definition.authorId = $rootScope.$storage.currentUser.uid;
    $scope.definition.author = $rootScope.$storage.currentUser.username;
    Definition.create($scope.definition).then(function () {
      $scope.definition = {};
    });
    User.addDefinition($scope.definition, $rootScope.$storage.currentUser.uid);
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










};
