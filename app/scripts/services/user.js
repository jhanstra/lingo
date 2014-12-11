'use strict';

module.exports = function($firebase, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var users = ref.child("users");

  var User = {
    all: users,
    create: function(user, authData) {
      return users.push(user);
    },
    findByUsername: function(username) {
      if (username) {
        return users.$child(username);
      }
    },
    getCurrent: function () {
      return $rootScope.currentUser;
    },
    signedIn: function () {
      return $rootScope.currentUser !== undefined;
    }
  };

  function setCurrentUser(username) {
    $rootScope.currentUser = User.findByUsername(username);
  }

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
    var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));

    query.$on('loaded', function() {
      setCurrentUser(query.$getIndex()[0]);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    delete $rootScope.currentUser;
  });

  return User;
};
