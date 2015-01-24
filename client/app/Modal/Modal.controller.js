'use strict';

angular.module('trelloApp')
  .controller('ModalCtrl', ModalCtrl);

 ModalCtrl.$inject = ['$modalInstance', 'noteData', 'dataService',
 											'listService'];

 function ModalCtrl($modalInstance, noteData, dataService,
 										listService) {

  var vm = this;

  vm.cancel = cancel;
  vm.listIndex = noteData.listIndex;
  vm.noteDescription = noteData.noteDescription;
  vm.noteName = noteData.noteName;
  vm.save = save;

  function cancel () {
    $modalInstance.dismiss('cancel');
  };

  function save() {
	  dataService.createNote({
	    name: vm.noteName,
      description: vm.noteDescription,
	    listId: listService.lists[vm.listIndex]._id
	  })
	  .then(function() {
      $modalInstance.close({msg: 'song saved'});
    })
  }


}
