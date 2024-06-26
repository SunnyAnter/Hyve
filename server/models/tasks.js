const mongoose = require('./index');
const { Schema } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  due_date: {
    type: Number,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
  assignees: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  logs: [{ type: Schema.Types.ObjectId, ref: 'Logs' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }]
},{timestamps:true})
const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;