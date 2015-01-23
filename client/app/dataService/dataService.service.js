'use strict';

angular.module('trelloApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  var meaningOfLife = 42;

  return {
    get: get
  }

  function get(userId) {
    return $http.get('/api/users/:id');
  }


};

