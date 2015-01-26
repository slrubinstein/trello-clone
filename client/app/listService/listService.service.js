'use strict';

angular.module('trelloApp')
  .factory('listService', listService);

listService.$inject = ['dataService', '$q'];

function listService(dataService, $q) {

  var lists = [];

  return {
    createList: createList,
    deleteList: deleteList,
    getLists: getLists,
    deleteNote: deleteNote,
    lists: lists
  }

  function createList(newListOptions) {
    dataService.createList(newListOptions)
      .then(function(result) {
        updateUserLists(newListOptions.creatorId, result.data._id);
      });
    lists.push(newListOptions);
    return lists;
  }

  function getLists(userId) {
    var deferred = $q.defer();

    dataService.get(userId)
    .then(function(result) {
      lists.length = 0;
      result.data.forEach(function(list) {
        lists.push(list);
      });
      deferred.resolve(lists);
    });

    return deferred.promise;
  }

  function deleteList(index, listId) {
    dataService.deleteList(listId);
    lists.splice(index, 1);
    return lists;
  }

  function deleteNote(listIndex, noteIndex) {
    lists[listIndex].notes.splice(noteIndex, 1);
    dataService.rearrangeNotes([lists[listIndex]]);
  }

  function updateUserLists(userId, listId) {
    dataService.updateUserLists(userId, listId);
  }

}