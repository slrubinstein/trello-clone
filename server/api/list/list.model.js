'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListSchema = new Schema({
  name: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: { type: Date, default: Date.now }
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
});

module.exports = mongoose.model('List', ListSchema);