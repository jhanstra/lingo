'use strict';

module.exports = function ($firebase, FIREBASE_URL) {
var ref = new Firebase(FIREBASE_URL + entries);

  var entries = $firebase(ref).$asArray();

  var Entry = {
    all: entries,
    create: function (entry) {
        return entries.$add(entry);
    },
    find: function (entryId) {
      return $firebase(ref.child(entryId)).$asObject();
    },
    delete: function (entry) {
      return entries.$remove(entry);
    }
  };

  return Entry;
};
