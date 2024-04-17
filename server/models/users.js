const mongoose = require('./index');
const { Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
const Users = mongoose.model('Users', userSchema);

module.exports = Users;