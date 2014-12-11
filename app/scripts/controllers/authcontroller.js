'use strict';

module.exports = function ($scope, $location, Auth, User) {
    // if (Auth.signedIn() && $location.path('register')) {
    //   $location.path('/');
    // }
    // if (Auth.signedIn() && $location.path('login')) {
    //   $location.path('/');
    // }

    $scope.user = {
      first_name:'',
      last_name:'',
      dob:'',
    };


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
      console.log("User: " + $scope.user); // logs object correctly
      Auth.register($scope.user);
    };

    $scope.signInWithFacebook = function() {
      Auth.signInWithFacebook();
      var authData = Auth.getLoginInfo();
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
