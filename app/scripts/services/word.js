'use strict';

module.exports = function ($firebase, FIREBASE_URL) {
var ref = new Firebase(FIREBASE_URL + 'words');

  var words = $firebase(ref).$asArray();

  var Word = {
    all: words,
    create: function (word) {
        return words.$add(word);
    },
    find: function (wordId) {
      return $firebase(ref.child(wordId)).$asObject();
    },
    delete: function (word) {
      return words.$remove(word);
    }
  };

  return Word;
};
