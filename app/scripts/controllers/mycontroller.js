module.exports = function($rootScope, $scope, $location, Definition, Word, User) {

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
