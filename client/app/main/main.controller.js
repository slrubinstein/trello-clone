'use strict';

angular.module('trelloApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['socket', 'dataService'];

function MainCtrl(socket, dataService) {

  var vm = this;

  vm.lists = [1,2,3]
    // $scope.awesomeThings = [];
  vm.get = get;
    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });


  function get() {
    vm.lists = dataService.get();
    socket.syncUpdates('list', vm.lists);
  }
}
