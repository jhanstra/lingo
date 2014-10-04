module.exports = function($rootScope, $scope, $firebase, $location, Auth, User) {
  $rootScope.searchTerm = "";
  $scope.goTo = function( hash ) {
      $location.path( hash );
  };
};
