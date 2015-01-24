'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
  name: String,
  description: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  creatorName: String,
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', NoteSchema);