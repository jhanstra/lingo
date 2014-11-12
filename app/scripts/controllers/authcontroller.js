'use strict';

module.exports = function ($scope, $location, Auth, User) {
    // if (Auth.signedIn() && $location.path('register')) {
    //   $location.path('/');
    // }
    // if (Auth.signedIn() && $location.path('login')) {
    //   $location.path('/');
    // }

    $scope.user = {};


    // $scope.$on('$firebaseSimpleLogin:login', function () {
    //   $location.path('/');
    // });

    $scope.signIn = function () {
      Auth.signIn($scope.user);
    };

    $scope.signOut = function () {
      Auth.signOut();
    };

    $scope.register = function () {
      Auth.register($scope.user).then(function (authUser) {
        User.create(authUser, $scope.user.reg_username);
        Auth.signIn($scope.user).then(function () {
          $location.path('/');
        });
      }, function (error) {
        $scope.error = error.toString();
      });
    };

    $scope.signInWithFacebook = function() {
      Auth.signInWithFacebook();
      // .then(function (authUser) {
      //   User.create(authUser, $scope.user.reg_username);
      //   Auth.signIn($scope.user).then(function () {
      //     $location.path('/');
      //   });
      // }, function (error) {
      //   $scope.error = error.toString();
      // });
    };
  };
