var mongoose = require('mongoose');

var UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minLength: 8
    }
  }
);

var UserSchema = mongoose.model('users', UserSchema);
module.exports = UserSchema;
