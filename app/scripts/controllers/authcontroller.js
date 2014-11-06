'use strict';

module.exports = function ($scope, $location, Auth, User) {
    // if (Auth.signedIn() && $location.path('register')) {
    //   $location.path('/');
    // }
    // if (Auth.signedIn() && $location.path('login')) {
    //   $location.path('/');
    // }

    $scope.$on('$firebaseSimpleLogin:login', function () {
      $location.path('/');
    });

    $scope.login = function () {
      Auth.login($scope.user).then(function () {
        $location.path('/');
      }, function (error) {
        $scope.error = error.toString();
      });
    };

    $scope.logout = function () {
      Auth.logout();
    };

    $scope.register = function () {
      Auth.register($scope.user).then(function (authUser) {
        User.create(authUser, $scope.user.reg_username);
        Auth.login($scope.user).then(function () {
          $location.path('/');
        });
      }, function (error) {
        $scope.error = error.toString();
      });
    };

    var ref = new Firebase("https://crowdefine.firebaseio.com")
    $scope.loginWithFacebook = function() {
      Auth.loginWithFacebook();
    }
  };
