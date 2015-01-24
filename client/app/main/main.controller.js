'use strict';

angular.module('trelloApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['socket', 'dataService', '$scope', 'Auth', 'User',
                    'listService'];

function MainCtrl(socket, dataService, $scope, Auth, User,
                  listService) {

  var vm = this;

  vm.lists = []
  vm.createList = createList;
  vm.createNote = createNote;
  vm.deleteList = deleteList;
  vm.get = get;
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
    vm.lists = listService.createList({
      name: vm.newListName,
      creatorId: vm.user._id,
      creatorName: vm.user.name
    })
    vm.newListName = '';
    // vm.lists = listService.lists;
  }

  function createNote(index) {
    console.log(index)
    dataService.createNote({
      name: vm.newNoteName,
      creatorId: vm.user._id,
      creatorName: vm.user.name,
      listId: vm.lists[index]._id
    })
      .then(function() {
        get();
      })
  }

  function deleteList() {

  }

  function get() {
    listService.getLists(vm.user._id)
      .then(function(lists) {
        vm.lists = lists
      });
  }

}
