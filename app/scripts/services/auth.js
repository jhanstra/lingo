'use strict';

module.exports = function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);

    // var auth = $firebaseSimpleLogin(ref);
    // var auth = new FirebaseSimpleLogin(ref, function() {
    //   if (user) {
    //     // the access token will allow us to make Open Graph API calls
    //     console.log(user.accessToken);
    //   };
    // });

    var Auth = {
      register: function (user) {
        return ref.createUser(user.reg_email, user.reg_password);
      },
      signedIn: function () {
        var authData = null;
        authData = ref.getAuth();
        if (authData) { return true;}
        else { return false;};
      },
      signIn: function (user) {
        return ref.authWithPassword(user, function(error, authData) {
          if (error) {
            alert('Login Failed!', error);
          } else {
            console.log('Authenticated successfully with payload:', authData);
          }
        });
      },
      signOut: function () {
        ref.unauth();
      },
      signInWithFacebook: function () {
        return ref.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log('Login Failed!', error);
          } else {
            console.log('Authenticated successfully with payload:', authData);
          }
        },
        { scope: 'email' });
      }
    };

    $rootScope.signedIn = function () {
      return Auth.signedIn();
    };

    return Auth;
  };
