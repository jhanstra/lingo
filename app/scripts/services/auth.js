'use strict';

module.exports = function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);

    // var auth = $firebaseSimpleLogin(ref);
    var auth = new FirebaseSimpleLogin(ref, function() {
      if (user) {
        // the access token will allow us to make Open Graph API calls
        console.log(user.accessToken);
      };
    });

    var Auth = {
      register: function (user) {
        return auth.$createUser(user.reg_email, user.reg_password);
      },
      signedIn: function () {
        return auth.user !== null;
      },
      login: function (user) {
        return auth.$login('password', user);
      },
      logout: function () {
        auth.$logout();
      }
      loginWithFacebook: function () {
        auth.login('facebook').success(function(user) {
          console.log("Logged in as: " + user.uid);
        }, function(error) {
          console.error("Login failed: " + error);
        });
      }
    };

    $rootScope.signedIn = function () {
      return Auth.signedIn();
    };

    return Auth;
  };
