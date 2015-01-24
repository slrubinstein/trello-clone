'use strict';

angular.module('trelloApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['socket', 'dataService', '$scope', 'Auth',
                    'User'];

function MainCtrl(socket, dataService, $scope, Auth, User) {

  var vm = this;

  vm.lists = []
  vm.createList = createList;
  vm.deleteList = deleteList;
  vm.get = get;
  vm.newListName = '';
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
    dataService.createList({name: vm.newListName,
                         creator: vm.user._id});
    vm.newListName = '';
    get();
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
