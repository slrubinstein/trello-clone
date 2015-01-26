'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/lists', auth.isAuthenticated(), controller.getLists);
router.put('/:id/lists/add', auth.isAuthenticated(), controller.addList);
router.put('/:id/lists/rearrange', auth.isAuthenticated(), controller.rearrangeLists);
router.put('/:id/share', auth.isAuthenticated(), controller.shareList);
router.post('/', controller.create);

module.exports = router;