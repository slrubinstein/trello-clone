'use strict';

angular.module('trelloApp')
  .factory('listService', listService);

listService.$inject = ['dataService', '$q'];

function listService(dataService, $q) {

  var lists = [];

  return {
    getLists: getLists,
    deleteList: deleteList,
    deleteNote: deleteNote,
    lists: lists
  }

  function createList(newListOptions) {
    dataService.createList(newListOptions);
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

}