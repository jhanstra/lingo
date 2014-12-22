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
      console.log(uid);
      var ref = new Firebase('https://lingo-app.firebaseio.com/');
      var users = ref.child("users");
      return users.child(uid).on("value", function(snapshot) {
        console.log("UID: ", uid);
        console.log("Booyah:" + snapshot.val());
        $rootScope.$storage.currentUser = snapshot.val();
        console.log("Current User: ", $rootScope.$storage.currentUser);
        return snapshot.val()
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      })
    },

    addDefinition: function(definition, uid) {
      return users.child(uid).child('definitions').push(definition);
    }
  };

  // function setCurrentUser(username) {
  //   $rootScope.$storage.currentUser = User.findByUsername(username);
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
  //   delete $rootScope.$storage.currentUser;
  // });

  return User;
};
