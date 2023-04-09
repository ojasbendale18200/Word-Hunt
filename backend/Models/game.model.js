const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const gameSchema = mongoose.Schema({
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
}, { versionKey: false });

const GameModel = mongoose.model("game", gameSchema);

module.exports = { GameModel };


