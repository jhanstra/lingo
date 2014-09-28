'use strict';

module.exports = function ($firebase, FIREBASE_URL) {
var ref = new Firebase(FIREBASE_URL + 'definitions');

  var definitions = $firebase(ref).$asArray();

  var Definition = {
    all: definitions,
    create: function (definition) {
        return definitions.$add(definition);
    },
    find: function (definitionId) {
      return $firebase(ref.child(definitionId)).$asObject();
    },
    delete: function (definition) {
      return definitions.$remove(definition);
    }
  };

  return Definition;
};
