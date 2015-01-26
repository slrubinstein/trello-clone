'use strict';

angular.module('trelloApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['socket', 'dataService', '$scope', 'Auth', 'User',
                    'listService', '$modal'];

function MainCtrl(socket, dataService, $scope, Auth, User,
                  listService, $modal) {

  var vm = this;

  vm.createList = createList;
  vm.editNote = editNote;
  vm.deleteList = deleteList;
  vm.get = get;
  vm.lists = [];
  vm.shareEmail = '';
  vm.shareList = shareList;
  vm.newListName = '';
  vm.newNoteName = '';
  vm.user = '';

  activate();

  function activate() {
    Auth.isLoggedInAsync(setUser);
    socket.syncUpdates('list', vm.lists, get);

    function setUser(validUser) {
      if (validUser) {
        User.get({}, function(user) {
          vm.user = user;
          get(user._id);
        });
      }
    }
  }

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('list');
  });

  function createList() {
    vm.lists = listService.createList({
      name: vm.newListName,
      creatorId: vm.user._id,
      creatorName: vm.user.name
    });
    vm.newListName = '';
  }

  function editNote(listIndex, noteName, noteDescription, noteIndex) {
    var modalInstance = $modal.open({
      templateUrl: 'noteModal.html',
      resolve: {
        noteData: function() {
          var noteData = {
            noteName: noteName || '',
            noteDescription: noteDescription || '',
            listIndex: listIndex,
            noteIndex: noteIndex
          };
          return noteData;
        }
      },
      controller: 'ModalCtrl',
      controllerAs: 'modal',
    });

    modalInstance.result.then(function(result) {
      get();
    });
  }

  function deleteList(index) {
    vm.lists = listService.deleteList(index, vm.lists[index]._id);
  }

  function get() {
    listService.getLists(vm.user._id)
    .then(function(promise) {
      vm.lists = promise;
    });
  }

  function shareList(index) {
    var modalInstance = $modal.open({
      templateUrl: 'shareModal.html',
      resolve: {
        noteData: function() {
          return {
            listIndex: index,
            userId: vm.user._id
          }
        }
      },
      controller: 'ModalCtrl',
      controllerAs: 'modal',
    });

    modalInstance.result.then(function(result) {
      socket.socket.emit('update', vm.lists[index]);
    });
  }

  // options object for sortables
  vm.sortOptions = {
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
      dataService.rearrangeNotes(vm.lists);
    },
    orderChanged: function (event) {
      // notes moving in parent list
      if (event.source.itemScope.hasOwnProperty('note')) {
        dataService.rearrangeNotes([event.source.sortableScope.$parent.list]);
      }
      // sorting lists
      if (event.source.itemScope.hasOwnProperty('list')) {
        dataService.rearrangeLists(vm.user._id, vm.lists);
        socket.socket.emit('update', vm.lists[0]);
      }
    }
  }
}
