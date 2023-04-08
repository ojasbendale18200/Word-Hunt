const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../Models/user.model");



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
                socket.on("invitationResponseFromOpponent", (responseFromOpponent) => {
                    if (responseFromOpponent) {
                        io.to(inviteFrom.socketId).emit("invitationResponse", { "msg": "invitation accepted" });
                        // create a game in gameRoom
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
}
module.exports = userSocketHandler;
