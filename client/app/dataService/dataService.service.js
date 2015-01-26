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
    rearrange: rearrange,
    updateNote: updateNote,
    updateLists: updateLists,
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

  function rearrange(lists) {
    lists.forEach(function(list) {
      $http.put('/api/lists/' + list._id +'/rearrange', list);
    })    
  }

  function updateNote(noteOptions, noteIndex) {
    return $http.put('/api/lists/' + noteOptions.listId + '/updatenote', 
      {index: noteIndex,
       noteOptions: noteOptions});
  }

  function updateLists(lists) {
    // lists.forEach(function(list) {
    //   $http.put('/api/lists/' + list._id, lists);
    // })
  }

  function updateUserLists(userId, listId) {
    return $http.put('api/users/' + userId
                  + '/lists/add', {listId: listId,
                                   userId: userId})
  }

};

