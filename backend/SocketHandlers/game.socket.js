const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../Models/user.model");
const { GameModel } = require("../Models/game.model");

const gameSocketHandler = (io, socket) => {

    // listen to start timer event
    socket.on("startTimer", async (gameId) => {
        const game = await GameModel.findOne({ _id: gameId });

        startTimerInGame(io, gameId);
    });

    socket.on("scoreUpdate", async ({ score, socketId, gameId }) => {
        // update score of one of the user after matching the socketId

    })
}

const startTimerInGame = async (io, gameId) => {
    let timer = 45;
    let timerIntervalId = null;
    let timerResetCount = 0;

    timerIntervalId = setInterval(async() => {
        timer--;
        if (timer === 0) {
            io.emit("giveNewAlphabet");
            timer = 45;
            timerResetCount++;
        }
        // send the updated timer to both the players in the game
        // io.to(gameId).emit("updatedTimer", timer);
        const game = await GameModel.findOne({_id : gameId});
        io.to(game.player_1.socketId).to(game.player_2.socketId).emit("updatedTimer", timer)
        if (timerResetCount === 5) {
            clearInterval(timerIntervalId);
        }
    }, 1000)
}

module.exports = { gameSocketHandler }