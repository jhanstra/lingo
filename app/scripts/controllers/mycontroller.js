module.exports = function($scope, Entry) {
  $scope.search_term = "";
  $scope.entries = Entry.all;
  $scope.entry = {
    word: "",
    definition: ""
  };
  $scope.submitEntry = function () {
    Entry.create($scope.entry).then(function () {
      $scope.entry = {word:'', definition:''};
    });
  };
  $scope.deleteEntry = function (entry) {
    Entry.delete(entry);
  };
};
