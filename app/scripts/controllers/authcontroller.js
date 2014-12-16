'use strict';

module.exports = function ($rootScope, $scope, $location, Auth, User) {
    // if (Auth.signedIn() && $location.path('register')) {
    //   $location.path('/');
    // }
    // if (Auth.signedIn() && $location.path('login')) {
    //   $location.path('/');
    // }

    $scope.user = {
      uid:'',
      username:'',
      authMethod:'',
      email:'',
      bornAt:'',
      password:'',
      firstName:'',
      lastName:''
    };
    // var ref = new Firebase('https://lingo-app.firebaseio.com/');
    // ref.child('users').on("value", function(snapshot) {
    //   console.log("Objects:" + snapshot.val());
    //   $scope.test = snapshot.val();
    // }, function(errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });
    // $scope.$on('$firebaseSimpleLogin:login', function () {
    //   $location.path('/');
    // });

    $scope.signIn = function () {
      Auth.signIn($scope.user);
    };

    $scope.signOut = function () {
      Auth.signOut();
    };

    $rootScope.authData = Auth.getAuthData();

    $scope.register = function () {
      // Auth.register($scope.user).then(function (authUser) {
      //   User.create(authUser, $scope.user.username);
      //   Auth.login($scope.user).then(function () {
      //     $location.path('/');
      //   });
      // }, function (error) {
      //   $scope.error = error.toString();
      // });
      $scope.user.displayName = $scope.user.firstName + " " + $scope.user.lastName;
      Auth.register($scope.user);
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
