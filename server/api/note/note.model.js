'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
  name: String,
  description: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', NoteSchema);