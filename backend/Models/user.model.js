const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  matchData:{},
  status: String
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
