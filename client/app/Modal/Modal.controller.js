'use strict';

angular.module('trelloApp')
  .controller('ModalCtrl', ModalCtrl);

 ModalCtrl.$inject = ['$modalInstance', 'noteData', 'dataService',
 											'listService'];

 function ModalCtrl($modalInstance, noteData, dataService,
 										listService) {

  var vm = this,
      edit = typeof noteData.noteIndex === 'number' ? true : false;

  vm.cancel = cancel;
  vm.listIndex = noteData.listIndex;
  vm.noteDescription = noteData.noteDescription;
  vm.noteIndex = noteData.noteIndex;
  vm.noteName = noteData.noteName;
  vm.save = save;

  function cancel () {
    $modalInstance.dismiss('cancel');
  };

  function save() {
    console.log(vm.noteName)
    var noteOptions = {
      name: vm.noteName,
      description: vm.noteDescription,
      listId: listService.lists[vm.listIndex]._id,
      noteIndex: vm.noteIndex
    };
console.log(edit)
    if (edit) {
      dataService.updateNote(noteOptions, vm.noteIndex)
      .then(function() {
        $modalInstance.close({msg: 'note updated'});
      });
    } else {
      dataService.createNote(noteOptions)
      .then(function() {
        $modalInstance.close({msg: 'new note saved'});
      });
    }
  }
}
