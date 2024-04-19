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

var UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
