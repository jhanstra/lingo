'use strict';

module.exports = function ($firebase, $firebaseAuth, User, $location, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    var Auth = {
      register: function (user) {
        var authData = auth.$getAuth();
        console.log("authData: " + authData);
        return auth.$createUser(user.email, user.password).then(function(authData) {
          User.create(user, authData);
          auth.$authWithPassword(user).then(function(authData) {
            console.log("Logged in as: ", authData.uid);
            $location.path('/');
          }).catch(function(error) {
            console.log("Authentication failed: ", error);
          })
        });
      },
      signedIn: function () {
        var authData = null;
        authData = auth.$getAuth();
        if (authData) { return 'true' }
        else { return 'false'};
      },
      getLoginInfo: function () {
        return auth.$getAuth();
      },
      signIn: function (user) {
        return auth.$authWithPassword(user).then(function(authData) {
          console.log("Logged in as: ", authData.uid);
          $location.path('/');
        }).catch(function(error) {
          console.log("Authentication failed: ", error);
        });
      },
      signOut: function () {
        auth.$unauth();
      },
      signInWithFacebook: function () {
        return auth.$authWithOAuthPopup("facebook",{ scope: "email"}).then(function(authData) {
          console.log("Logged in as:", authData.facebook.displayName);
          var user = {
            displayName: authData.facebook.displayName,
            email: authData.facebook.email,
            authMethod: 'facebook'
          };
          User.create(user, authData);
          $location.path('/');
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
      }
    };
    

    return Auth;
  };
