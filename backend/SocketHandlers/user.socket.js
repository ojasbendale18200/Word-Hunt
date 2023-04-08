const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../Models/user.model");



const userSocketHandler = (io,socket) => {

    // listen to update user's status 
    socket.on("updateStatus", async (token) => {
        const decoded = jwt.verify(token, process.env.key);
        const user = await UserModel.findOne({ _id: decoded.userID });
        if (user) {
            user.status = "available";
            await user.save();
        }

        // emit list of updated userStatus
        const userList = await UserModel.find({}, {_id:1,socketId:1, name: 1, email: 1, status: 1, password: 0, matchData: 0 });
        io.emit("updatedStatusList", userList)
    });



    // listen to inviteUser event
    socket.on("inviteUser", async(invitedUsersID) => {
        console.log("user ", invitedUsersID)
        
        const userToInvite = await UserModel.findById(invitedUsersID);
        if(userToInvite && userToInvite.status === "available"){
            // emit the invitation to the user
            io.to(userToInvite.socketId).emit("invitationForYou",{invitedBy : socket.id});
            socket.on("invitationResponseFromOpponent",(responseFromOpponent)=>{
                if(responseFromOpponent){
                    socket.emit("invitationResponse", {"msg" : "invitation accepted"});
                }
                else{
                    socket.emit("invitationResponse", {"msg" : "invitation rejected"});
                }
            })
        }
        else{
            socket.emit("invitationResponse",{"msg" : "user not available."})
        }
        
    });
}
module.exports = userSocketHandler;