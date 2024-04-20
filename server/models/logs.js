const mongoose = require('./index');
const { Schema } = require('mongoose');

const logSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  msg: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
})
const Logs = mongoose.model('Logs', logSchema);

module.exports = Logs;