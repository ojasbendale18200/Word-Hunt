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
        const userList = await UserModel.find({}, { _id: 1, socketId: 1, name: 1, email: 1, status: 1, password: 0, matchData: 0 });
        io.emit("updatedStatusList", userList)
    });

    // listen to inviteUser event
    socket.on("inviteUser", async (invitedUsersID) => {
        console.log("user ", invitedUsersID)
        try {
            const userToInvite = await UserModel.findById(invitedUsersID);
            if (userToInvite && userToInvite.status === "available") {

                // get the name of the user who is inviting
                const inviteFrom = await UserModel.findOne({ socketId: socket.id });
                // emit the invitation to the user
                io.to(userToInvite.socketId).emit("invitationForYou", { invitedBy: inviteFrom.name });
                socket.on("invitationResponseFromOpponent", async (responseFromOpponent) => {
                    if (responseFromOpponent) {
                        io.to(inviteFrom.socketId).emit("invitationResponse", { "msg": "invitation accepted" });

                        // change the status of both the user from available ---> in-game
                        inviteFrom.status = "in-game";
                        inviteFrom.save();
                        userToInvite.status = "in-game";
                        userToInvite.save();
                        // create a game in gameRoom
                        const player_1 = {
                            _id: inviteFrom._id,
                            name: inviteFrom.name,
                            score: 0,
                            socketId: inviteFrom.socketId,
                        };
                        const player_2 = {
                            _id: userToInvite._id,
                            name: userToInvite.name,
                            score: 0,
                            socketId: userToInvite.socketId,
                        };
                        const game = await createGame(player_1, player_2);

                        // send the game to both the players 
                        io.to(player_1.socketId).emit("gameCreated", game);
                        io.to(player_2.socketId).emit("gameCreated", game);
                    }
                    else {
                        io.to(inviteFrom.socketId).emit("invitationResponse", { "msg": "invitation rejected" });
                    }
                })
            }
            else {
                socket.emit("invitationResponse", { "msg": "user not available." })
            }
        } catch (error) {
            console.log(error.message);
            socket.emit("invitationResponse", { "msg": "error occurred !!" });
        }

    });

    socket.on("scoreUpdate", async({score,socketId,gameId}) =>{
        // update score of one of the user after matching the socketId
    })
}

const createGame = async (player_1, player_2) => {
    const game = new GameModel({
        winner_socketId: "",
        winner_name: "",
        winner_score: 0,
        player_1,
        player_2
    });
    const savedGame = await game.save();

    return savedGame;
}


module.exports = userSocketHandler;
