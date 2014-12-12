  module.exports = function($rootScope, $scope, $firebase, $location, Auth, User) {
  $rootScope.searchTerm = "";
  $rootScope.addMode = false;
  $scope.goTo = function( hash ) {
      $location.path( hash );
  };
  $scope.add = function () {
    $rootScope.addMode = !$rootScope.addMode;
  }
  $scope.signedIn = function () {
    return Auth.signedIn();
  };
};
