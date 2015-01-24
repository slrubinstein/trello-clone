'use strict';

angular.module('trelloApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  var meaningOfLife = 42;

  return {
    createList: createList,
    get: get,
    deleteList: deleteList
  }

  function createList(newListOptions) {
    return $http.post('/api/lists', newListOptions)
              .then(function(list) {
                $http.put('api/users/' + newListOptions.creator
                  + '/lists/add', {listId: list.data._id})
              });
  }

  function get(userId) {
    return $http.get('/api/users/' + userId + '/lists');
  }

  function deleteList() {

  }


};

