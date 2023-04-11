const express = require("express");
const { connection } = require("./config/db");
const { useRouter } = require("./Routes/user.routes");
const {UserModel} = require("./Models/user.model");
require("dotenv").config();
const http = require("http");
const { userSocketHandler } = require("./SocketHandlers/user.socket");
const { gameSocketHandler } = require("./SocketHandlers/game.socket");
const { inviteSocketHandler } = require("./SocketHandlers/invite.socket");


const cors = require("cors");

const { dataRouter } = require("./Routes/data.routes");

const { Server } = require("socket.io");



const app = express();
const server = http.createServer(app);

app.options("*", cors());
app.use(express.json());
app.use(cors({ origin: "*" }));


app.get("/", (req, res) => {
  res.status(200).send({ msg: "Home Page" });
});

app.use("/users", useRouter);

app.use("/data", dataRouter)


// Socket

const io = new Server(server, {
  cors: {
    // origin: "*",
    origin: ["https://word-hunt-indol.vercel.app","http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user is connected : ${socket.id}`);

  userSocketHandler(io, socket);
  inviteSocketHandler(io, socket);
  gameSocketHandler(io, socket);


  // update user's status to "offline" when they disconnect
  socket.on("disconnect", async () => {
    console.log(`disconnected : ${socket.id}`)
    const user = await UserModel.findOne({ socketId: socket.id });
    if (user) {
      user.status = "offline";
      user.socketId = "";
      await user.save();
      const userList = await UserModel.find({}, { _id: 1, socketId: 1, name: 1, email: 1, status: 1 });
      io.emit("updatedStatusList", userList);
    }
  });
})

server.listen(process.env.port, async (req, res) => {
  try {
    await connection
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log({ msg: error });
  }
  console.log(`listening on server ${process.env.port}`);
});