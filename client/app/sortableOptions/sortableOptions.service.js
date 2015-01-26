'use strict';

angular.module('trelloApp')
  .factory('sortableOptions', sortableOptions)

function sortableOptions() {

  var options = {
    //restrict move across columns. move only within column.
    accept: function (sourceItemHandleScope, destSortableScope) {
      // notes can only switch with other notes
      if (sourceItemHandleScope.itemScope.hasOwnProperty('note')) {
        var n = destSortableScope.element[0].classList;
        return Array.prototype.indexOf.call(n, 'note-group') >= 0;
      // lists can only switch with other lists
      } else if (sourceItemHandleScope.itemScope.hasOwnProperty('list')) {
        var l = destSortableScope.element[0].classList;
        return Array.prototype.indexOf.call(l, 'list-board') >= 0;
      }
    },
    itemMoved: function (event) {
      // notes moving between lists
      dataService.rearrange(vm.lists);
    },
    orderChanged: function (event) {
      // notes moving in parent list
      if (event.source.itemScope.hasOwnProperty('note')) {
        dataService.rearrange([event.source.sortableScope.$parent.list]);
      }
      // sorting lists
      if (event.source.itemScope.hasOwnProperty('list')) {
        dataService.rearrangeLists(vm.user._id, vm.lists);
      }
    }
  }

  return {
    options: options
  }

}

