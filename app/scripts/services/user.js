'use strict';

module.exports = function($firebase, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var users = ref.child("users");

  var User = {
    all: function() {
      return users.on("value", function(snapshot) {
        console.log("Objects:" + snapshot.val());
        return snapshot.val();
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      })
    },
    create: function(user, authData) {
      return users.child(user.uid).set(user);
    },
    findByUsername: function(username) {
      if (username) {
        return users.child(username);
      }
    },
    findByUid: function(uid) {
      return users.child(uid).on('value', function(snapshot) {
        console.log("Booyah:" + snapshot.val());
        $rootScope.currentUser = snapshot.val();
        return snapshot.val()
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      })
    }
    // getCurrentUser: function () {
    //   return $rootScope.currentUser;
    // },
    // signedIn: function () {
    //   return $rootScope.currentUser !== undefined;
    // }
  };

  // function setCurrentUser(username) {
  //   $rootScope.currentUser = User.findByUsername(username);
  // }
  //
  // $rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
  //   var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));
  //
  //   query.$on('loaded', function() {
  //     setCurrentUser(query.$getIndex()[0]);
  //   });
  // });
  //
  // $rootScope.$on('$firebaseSimpleLogin:logout', function() {
  //   delete $rootScope.currentUser;
  // });

  return User;
};
