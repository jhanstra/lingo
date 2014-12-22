'use strict';

module.exports = function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var definitions = ref.child("definitions");

  var Definition = {
    all: definitions,
    create: function (definition) {
        return definitions.push(definition);
    },
    find: function (definitionId) {
      return definitions.child(definitionId);
    },
    delete: function (definition) {
      return definitions.remove(definition);
    }
  };

  return Definition;
};
