const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../Models/user.model");
const { GameModel } = require("../Models/game.model");

const gameSocketHandler = (io, socket) => {

    // listen to start timer event
    socket.on("startTimer", async (gameId) => {
        const game = await GameModel.findOne({ _id: gameId });
        if (game) {
            await startTimerInGame(io, gameId);
        }
    });

    // listen to update score event
    socket.on("scoreUpdate", async ({ score, socketId, gameId }) => {
        try {
            const game = await GameModel.findOne({ _id: gameId });
            if (!game) {
                throw new Error("Game not found");
            }
            if (socketId === game.player_1.socketId) {
                game.player_1.score = score;
            } else if (socketId === game.player_2.socketId) {
                game.player_2.score = score;
            } else {
                throw new Error("Socket ID not found");
            }
            await game.save();
        } catch (err) {
            console.error(err);
            socket.emit("scoreUpdatefailed", { "msg": err.message });
        }
    });

}

const startTimerInGame = async (io, gameId) => {
    let timer = 45;
    let timerIntervalId = null;
    let timerResetCount = 0;

    timerIntervalId = setInterval(async () => {
        timer--;
        if (timer === 0) {
            timer = 45;
            timerResetCount++;
        }
        const game = await GameModel.findOne({ _id: gameId });
        if (timer === 45 && timerResetCount !== 5) {
            // generate a random alphabet and send it to both the users
            const alphabet = generateRandomAlphabet()
            io.to(game.player_1.socketId).to(game.player_2.socketId).emit("newAlphabet", alphabet);
        }

        // send the updated timer to both the players in the game
        io.to(game.player_1.socketId).to(game.player_2.socketId).emit("updatedTimer", timer)
        if (timerResetCount === 5) {
            io.emit("gameOver", game)
            clearInterval(timerIntervalId);
        }
    }, 1000)
}

const generateRandomAlphabet = () => {
    const letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "y",
        "z",
    ];
    return letters[Math.floor(Math.random() * letters.length)].toUpperCase();
}

module.exports = { gameSocketHandler }