/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Note = require('./note.model');

exports.register = function(socketio) {
  Note.schema.post('save', function (doc) {
    onSave(socketio, doc);
  });
  Note.schema.post('remove', function (doc) {
    onRemove(socketio, doc);
  });
}

function onSave(socketio, doc, cb) {
  socketio.emit('note:save', doc);
}

function onRemove(socketio, doc, cb) {
  socketio.emit('note:remove', doc);
}