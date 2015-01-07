module.exports = function($rootScope, $scope, Definition, $firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);

  ref.child("definitions").on("value", function(snapshot) {
    console.log(snapshot.val());
    console.log('Current UID: ', $rootScope.$storage.currentUser.uid);
    $scope.globalDefinitions = snapshot.val();
  }, function ( errorObject) {
    console.log('The read failed');
  });

};
