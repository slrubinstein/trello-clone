'use strict';

angular.module('trelloApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['socket', 'dataService', '$scope', 'Auth', 'User',
                    'listService', '$modal', 'sortableOptions'];

function MainCtrl(socket, dataService, $scope, Auth, User,
                  listService, $modal, sortableOptions) {

  var vm = this;

  vm.createList = createList;
  vm.createNote = createNote;
  vm.deleteList = deleteList;
  vm.get = get;
  vm.lists = []
  vm.newListName = '';
  vm.newNoteName = '';
  vm.user = '';

  // options object for sortables
  vm.sortOptions = sortableOptions.options;

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


}
