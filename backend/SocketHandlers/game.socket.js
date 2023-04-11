const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../Models/user.model");
const { GameModel } = require("../Models/game.model");

const gameSocketHandler = (io, socket) => {
    let gameAdded = false;
    
    // listen to start timer event
    socket.on("startTimer", async (gameId) => {
        let timerStarted = false;
        const game = await GameModel.findOne({ _id: gameId });
        if (game && !timerStarted) {
            // console.log("game");
            timerStarted = true;
            await startTimerInGame(io, gameId,gameAdded);
        }
    });

    // listen to update score event
    socket.on("scoreUpdate", async ({ score, socketId, gameId }) => {
        // console.log(score)
        try {
            const game = await GameModel.findOne({ _id: gameId.toString() });
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

            // sent updated score to both the users
            io.to(game.player_1.socketId).to(game.player_2.socketId).emit("updatedScore", game)
        } catch (err) {
            console.error(err);
            socket.emit("scoreUpdatefailed", { "msg": err.message });
        }
    });

}

const startTimerInGame = async (io, gameId,gameAdded) => {
    let timer = 40;
    let timerIntervalId = null;
    let timerResetCount = 0;
    timerIntervalId = setInterval(async () => {
        if (timer === 0) {
            timer = 40;
            timerResetCount++;
        }
        const game = await GameModel.findOne({ _id: gameId });
        if (timer === 40 && timerResetCount !== 3) {
            // generate a random alphabet and send it to both the users
            const alphabet = generateRandomAlphabet()
            io.to(game.player_1.socketId).to(game.player_2.socketId).emit("newAlphabet", alphabet);
        }

        // send the updated timer to both the players in the game
        io.to(game.player_1.socketId).to(game.player_2.socketId).emit("updatedTimer", timer)
        if (timerResetCount === 3) {
            const updatedGame = await updateGame(game)
            io.emit("gameOver", updatedGame)
            if (!gameAdded) {
                addGameToUsersData(updatedGame);
                gameAdded = true;
            }
            // console.log("added")
            clearInterval(timerIntervalId);
        }
        timer--;
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

const addGameToUsersData = async (game) => {
    const player_1 = await UserModel.findOne({ _id: game.player_1._id });
    player_1.matchData.push(game);
    await player_1.save();
    const player_2 = await UserModel.findOne({ _id: game.player_2._id });
    player_2.matchData.push(game);
    await player_2.save();
}

const updateGame = async (game) => {
    if(game.player_1.score > game.player_2.score){
        game.winner_socketId = game.player_1.socketId;
        game.winner_name = game.player_1.name;
        game.winner_score = game.player_1.score;
    }
    else{
        game.winner_socketId = game.player_2.socketId;
        game.winner_name = game.player_2.name;
        game.winner_score = game.player_2.score;
    }
    await game.save();
    return game;
}

module.exports = { gameSocketHandler }