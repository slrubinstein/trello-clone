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
    deleteList: deleteList,
    updateNote: updateNote,
    updateUserLists: updateUserLists
  }

  function createList(newListOptions) {
    return $http.post('/api/lists', newListOptions)
  }

  function createNote(newNoteOptions) {
    return $http.put('/api/lists/' + newNoteOptions.listId +
              '/addnote', newNoteOptions)
  }

  function get(userId) {
    return $http.get('/api/users/' + userId + '/lists');
  }

  function deleteList() {

  }

  function updateNote(noteOptions, noteIndex) {
    console.log(noteOptions)
    return $http.put('/api/lists/' + noteOptions.listId + '/updatenote', 
      {index: noteIndex,
       noteOptions: noteOptions});
  }

  function updateUserLists(userId, listId) {
    return $http.put('api/users/' + userId
                  + '/lists/add', {listId: listId,
                                   userId: userId})
  }

};

