'use strict';

angular.module('trelloApp')
  .factory('listService', listService);

listService.$inject = ['dataService'];

function listService(dataService) {

  var lists = [];

  return {
    // createList: createList,
    // getLists: getLists,
    deleteList: deleteList,
    lists: lists
  }

  function createList(newListOptions) {
    dataService.createList(newListOptions)
    lists.push(newListOptions);
    return lists;
  }

  function deleteList(index, listId) {
    dataService.deleteList(listId);
    lists.splice(index, 1);
    return lists;
  }

}