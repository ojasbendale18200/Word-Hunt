const express = require("express");
const { connection } = require("./config/db");
const { useRouter } = require("./Routes/user.routes");
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
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user is connected : ${socket.id}`);

  userSocketHandler(io, socket);
  inviteSocketHandler(io,socket);
  gameSocketHandler(io, socket);


  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
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