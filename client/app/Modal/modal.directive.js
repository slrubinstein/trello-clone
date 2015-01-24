'use strict';

angular.module('trelloApp')
  .directive('modal', function () {
    return {
      templateUrl: 'app/modal/modal.html',
      restrict: 'E'
    };
  });