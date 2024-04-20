const mongoose = require('./index');
const { Schema } = require('mongoose');

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  msg: {
    type: String,
    required: true
  }
},{timestamps:true})
const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;