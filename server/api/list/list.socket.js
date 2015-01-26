/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var List = require('./list.model');

exports.register = function(socketio) {
  List.schema.post('save', function (doc) {
    onSave(socketio, doc);
  });
  List.schema.post('remove', function (doc) {
    onRemove(socketio, doc);
  });
}

function onSave(socketio, doc, cb) {
  socketio.emit('list:save', doc);
}

function onRemove(socketio, doc, cb) {
  socketio.emit('list:remove', doc);
}