  module.exports = function($rootScope, $scope, $firebase, $location, Auth, User, Word, Definition, $localStorage, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    $rootScope.searchTerm = "";
    $rootScope.addMode = false;
    $rootScope.authData = null;
    $scope.goTo = function( hash ) {
        $location.path( hash );
    };
    $scope.add = function () {
      $rootScope.addMode = !$rootScope.addMode;
    }
    $scope.signedIn = function () {
      return Auth.signedIn();
    };

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
      Definition.create($scope.definition);
      User.addDefinition($scope.definition, $rootScope.$storage.currentUser.uid);
      $scope.definition = {};
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

    ref.child("users").child($rootScope.$storage.currentUser.uid).child("definitions").on("value", function(snapshot) {
      console.log(snapshot.val());
      console.log('Current UID: ', $rootScope.$storage.currentUser.uid);
      $rootScope.myDefinitions = snapshot.val();
    }, function ( errorObject) {
      console.log('The read failed');
    });
};
