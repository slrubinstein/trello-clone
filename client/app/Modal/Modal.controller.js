'use strict';

angular.module('trelloApp')
  .controller('ModalCtrl', ModalCtrl);

 ModalCtrl.$inject = ['$modalInstance', 'noteData', 'dataService',
 											'listService'];

 function ModalCtrl($modalInstance, noteData, dataService,
 										listService) {

  var vm = this;

  vm.cancel = cancel;
  vm.deleteNote = deleteNote;
  vm.edit = typeof noteData.noteIndex === 'number' ? true : false;
  vm.listIndex = noteData.listIndex;
  vm.noteDescription = noteData.noteDescription;
  vm.noteIndex = noteData.noteIndex;
  vm.noteName = noteData.noteName;
  vm.save = save;
  vm.share = share;
  vm.shareEmail = '';
  vm.userId = noteData.userId;

  function cancel () {
    $modalInstance.dismiss('cancel');
  };

  function deleteNote() {
    listService.deleteNote(vm.listIndex, vm.noteIndex);
    $modalInstance.close({msg: 'note deleted'});
  }

  function save() {
    var noteOptions = {
      name: vm.noteName,
      description: vm.noteDescription,
      listId: listService.lists[vm.listIndex]._id,
      noteIndex: vm.noteIndex
    };
    
    if (vm.edit) {
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

  function share() {
    dataService.shareList(vm.shareEmail, listService.lists[vm.listIndex]._id, vm.userId)
      .then(function() {
        $modalInstance.close({msg: 'list shared'});
      }, function() {
        $modalInstance.close({msg: 'user not found'});
      });
  }
}
