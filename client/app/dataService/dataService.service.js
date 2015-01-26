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
    rearrangeNotes: rearrangeNotes,
    rearrangeLists: rearrangeLists,
    shareList: shareList,
    updateNote: updateNote,
    updateUserLists: updateUserLists
  }

  function createList(newListOptions) {
    return $http.post('/api/lists', newListOptions);
  }

  function createNote(newNoteOptions) {
    return $http.put('/api/lists/' + newNoteOptions.listId +
              '/addnote', newNoteOptions)
  }

  function get(userId) {
    return $http.get('/api/users/' + userId + '/lists');
  }

  function deleteList(listId) {
    return $http.delete('/api/lists/' + listId);
  }

  function deleteNote(listId, noteIndex) {
    return $http.delete('/api/lists/' + listId);
  }

  function rearrangeLists(userId, lists) {
    var listIds = lists.map(function(list) {
      return list._id;
    });
    return $http.put('/api/users/' + userId + '/lists/rearrange', listIds);
  }

  function rearrangeNotes(lists) {
    lists.forEach(function(list) {
      $http.put('/api/lists/' + list._id +'/rearrange', list);
    })    
  }

  function shareList(email, listId, userId) {
    return $http.put('/api/users/' + userId + '/share',
              {listId: listId,
              email: email});
  }

  function updateNote(noteOptions, noteIndex) {
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

