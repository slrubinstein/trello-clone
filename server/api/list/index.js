'use strict';

var express = require('express');
var controller = require('./list.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/updatenote', controller.updateNote);
router.put('/:id/addnote', controller.addNote);
router.put('/:id/rearrange', controller.rearrange);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;