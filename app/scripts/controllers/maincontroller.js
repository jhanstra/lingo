module.exports = function($rootScope, $scope, $firebase, $location, Auth, User) {
  $rootScope.searchTerm = "";
  $scope.goTo = function( hash ) {
      $location.path( hash );
  };
  $scope.add = function () {
    $scope.addMode = true;
  }
};
