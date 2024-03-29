'use strict';

module.exports = function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var definitions = ref.child("definitions");

  var Definition = {
    all: function() {
      definitions.on("value", function(snapshot) {
        console.log(snapshot.val());
        var results = snapshot.val();
      }, function( errorObject ) {
        console.log( errorObject );
      });
      return results;
    },
    create: function (definition) {
        return definitions.push(definition);
    },
    find: function (definitionId) {
      return definitions.child(definitionId);
    },
    delete: function (definition) {
      definitions.$remove(definition.$id);
    }
  };

  return Definition;
};
