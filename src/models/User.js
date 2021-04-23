const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  preName: String,
  lastName: String,
  username: {
    unique: true,
    required: true,
    type: String,
  },
  pwd: {
    type: String,
    required: true,
  },
  scopes: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
  createdTs: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
