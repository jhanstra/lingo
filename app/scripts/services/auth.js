'use strict';

module.exports = function ($firebase, $firebaseAuth, User, $location, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    var Auth = {
      register: function (user) {
        var authData = auth.$getAuth();
        console.log("authData: " + authData);
        return auth.$createUser(user.email, user.password).then(function(authData) {
          auth.$authWithPassword(user).then(function(authData) {
            user.uid = authData.uid;
            user.authMethod = authData.provider;
            user.password = authData.token;
            var currentDate = new Date();
            user.bornAt = currentDate.getDate() + "/" + (currentDate.getMonth() + 1 )
            + "/" + currentDate.getFullYear() + " @ "
            + currentDate.getHours() + ":"
            + currentDate.getMinutes() + ":" + currentDate.getSeconds();
            User.create(user, authData);
            $rootScope.currentUser = user;
            $location.path('/');
          }).catch(function(error) {
            console.log("Authentication failed: ", error);
          })
        });
      },

      signedIn: function () {
        var authData = null;
        authData = auth.$getAuth();
        if (authData) { return true }
        else { return false };
      },

      getAuthData: function() {
        var authData = null;
        authData = auth.$getAuth();
        if (authData) { return authData }
          else { return false };
      },

      signIn: function (user) {
        return auth.$authWithPassword(user).then(function(authData) {
          $rootScope.currentUser = User.findByUid(authData.uid);
          $location.path('/');
        }).catch(function(error) {
          console.log("Authentication failed: ", error);
        });
      },

      signOut: function () {
        auth.$unauth();
        $rootScope.currentUser = null;
      },

      signInWithFacebook: function () {
        return auth.$authWithOAuthPopup("facebook",{ scope: "email"}).then(function(authData) {
          console.log("Logged in as:", authData.facebook.displayName);
          var nameArray = authData.facebook.displayName.split(' ');
          var currentDate = new Date();
          var user = {
            uid: authData.uid,
            displayName: authData.facebook.displayName,
            email: authData.facebook.email,
            username: authData.facebook.email,
            authMethod: authData.provider
          };
          user.bornAt = currentDate.getDate() + "/" + (currentDate.getMonth() + 1 )
          + "/" + currentDate.getFullYear() + " @ "
          + currentDate.getHours() + ":"
          + currentDate.getMinutes() + ":" + currentDate.getSeconds();
          user.firstName = nameArray[0];
          user.lastName = nameArray[nameArray.length - 1];
          User.create(user, authData);
          $rootScope.currentUser = user;
          $location.path('/');
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
      }
    };


    $rootScope.$on('$firebaseAuth:$authWithPassword', function(event, user) {
      console.log('logged in, this is working');
      angular.copy(user, Auth.user);
    });
    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      console.log('logged out');
      angular.copy({}, Auth.user);
    });

    return Auth;
  };
