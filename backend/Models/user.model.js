const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: String,
  socketId: String,
  matchData: [{
    winner_socketId: String,
    winner_name: String,
    winner_score: Number,
    player_1: {
      _id: ObjectId,
      name: String,
      score: Number,
      socketId: String
    },
    player_2: {
      _id: ObjectId,
      name: String,
      score: Number,
      socketId: String
    }
  },]
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
