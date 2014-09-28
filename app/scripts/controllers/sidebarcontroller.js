module.exports = function($rootScope, $scope, $location) {
  $scope.goTo = function( hash ) {
      $location.path( hash );
  };
};
