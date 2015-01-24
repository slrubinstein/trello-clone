'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListSchema = new Schema({
  name: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  creatorName: String,
  dateCreated: { type: Date, default: Date.now },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
});

module.exports = mongoose.model('List', ListSchema);