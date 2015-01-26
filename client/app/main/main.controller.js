'use strict';

angular.module('trelloApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['socket', 'dataService', '$scope', 'Auth', 'User',
                    'listService', '$modal'];

function MainCtrl(socket, dataService, $scope, Auth, User,
                  listService, $modal) {

  var vm = this;

  vm.createList = createList;
  vm.createNote = createNote;
  vm.deleteList = deleteList;
  vm.get = get;
  vm.lists = []
  vm.newListName = '';
  vm.newNoteName = '';
  vm.user = '';

  activate();



  function activate() {
    Auth.isLoggedInAsync(setUser);
    socket.syncUpdates('list', vm.lists);

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
    dataService.createList({
      name: vm.newListName,
      creatorId: vm.user._id,
      creatorName: vm.user.name
    })
    .then(function(result) {
      updateUserLists(result.data._id)
    })

    vm.newListName = '';
  }

  function updateUserLists(listId) {
    dataService.updateUserLists(vm.user._id, listId)
    .then(function() {
      get();
    });
  }

  function createNote(listIndex, noteName, noteDescription, noteIndex) {
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
    dataService.get(vm.user._id)
    .then(function(result) {
      listService.lists.length = 0;
      result.data.forEach(function(list) {
        listService.lists.push(list);
      });
      vm.lists = listService.lists;
    })
  }

  // options object for sortables
  vm.sortOptions = {
    //restrict move across columns. move only within column.
    accept: function (sourceItemHandleScope, destSortableScope) {
      // notes can only switch with other notes
      if (sourceItemHandleScope.itemScope.hasOwnProperty('note')) {
        var n = destSortableScope.element[0].classList;
        console.log(n)
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
      console.log(event.source.itemScope)
      if (event.source.itemScope.hasOwnProperty('note')) {
        console.log('note')
        dataService.rearrangeNotes([event.source.sortableScope.$parent.list]);
      }
      // sorting lists
      if (event.source.itemScope.hasOwnProperty('list')) {
        dataService.rearrangeLists(vm.user._id, vm.lists);
      }
    }
  }
}
