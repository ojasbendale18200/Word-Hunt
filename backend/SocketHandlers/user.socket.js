const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../Models/user.model");
const { GameModel } = require("../Models/game.model");

const userSocketHandler = (io, socket) => {

    // listen to update user's status 
    socket.on("updateStatus", async (token) => {
        const decoded = jwt.verify(token, process.env.key);
        const update = { status: "available", socketId: socket.id }
        await UserModel.findByIdAndUpdate(decoded.userID, update);

        // emit list of updated userStatus
        const userList = await UserModel.find({}, { _id: 1, socketId: 1, name: 1, email: 1, status: 1});
        io.emit("updatedStatusList", userList)
    });

    // add game to user's match data or history
    socket.on("addGameToMatchData", async(game) => {
        const user = await UserModel.findOne({socketId : socket.id});
        user.matchData.push(game);
        const updatedUserData = await user.save();
        socket.emit("getUpdatedMatchData", updatedUserData);
    })

    socket.on("getMatchHistory", async() => {
        const user = await UserModel.findOne({socketId : socket.id});
        socket.emit("getUsersData", user);
    })

}

module.exports = { userSocketHandler };
