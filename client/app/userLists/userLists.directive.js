'use strict';

angular.module('trelloApp')
  .directive('userLists', function () {
    return {
      templateUrl: 'app/userLists/userLists.html',
      restrict: 'E',
      scope: {},
      controller: 'MainCtrl',
      controllerAs: 'main'
    };
  });