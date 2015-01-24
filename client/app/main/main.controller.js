'use strict';

angular.module('trelloApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['socket', 'dataService', '$scope', 'Auth',
                    'User'];

function MainCtrl(socket, dataService, $scope, Auth, User) {

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
    dataService.createList({
      name: vm.newListName,
      creatorId: vm.user._id,
      creatorName: vm.user.name
    })
      .then(function() {
        vm.newListName = '';
        debugger
        get();
      });
  }

  function createNote(index) {
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
    dataService.get(vm.user._id)
      .then(function(lists) {
        vm.lists = lists.data;
      });
  }
}
