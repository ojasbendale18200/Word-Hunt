const express = require("express");
const { connection } = require("./config/db");
const { useRouter } = require("./Routes/user.routes");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.options("*", cors());
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Home Page" });
});

app.use("/users", useRouter);



// Socket

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection",(socket)=>{
  console.log("A user is connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
})






app.listen(process.env.port, async (req, res) => {
  try {
    await connection
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log({ msg: error });
  }
  console.log(`listening on server ${process.env.port}`);
});