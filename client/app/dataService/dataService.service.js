'use strict';

angular.module('trelloApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http', '$q'];

function dataService($http, $q) {

  var meaningOfLife = 42;

  return {
    createList: createList,
    createNote: createNote,
    get: get,
    deleteList: deleteList
  }

  function createList(newListOptions) {
    var deferred = $q.defer();

    // wrapping a promise around both $http calls to ensure
    // controller waits until both resolve
    deferred.resolve(
      $http.post('/api/lists', newListOptions)
        .then(function(list) {
        $http.put('api/users/' + newListOptions.creatorId
            + '/lists/add', {listId: list.data._id})
        })
    );
    return deferred.promise;
  }

  function createNote(newNoteOptions) {
    var deferred = $q.defer();

    deferred.resolve(
      $http.post('/api/notes', newNoteOptions)
        .then(function(note) {
          $http.put('api/lists/' + newNoteOptions.listId,
            {noteId: note.data._id});
        })
    );
    return deferred.promise;
  }

  function get(userId) {
    return $http.get('/api/users/' + userId + '/lists');
  }

  function deleteList() {

  }


};

