const express = require("express");
const { connection } = require("./config/db");
const { useRouter } = require("./Routes/user.routes");
require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Home Page" });
});

app.use("/users", useRouter);



app.listen(process.env.port, async (req, res) => {
  try {
    await connection
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log({ msg: error });
  }
  console.log(`listening on server ${process.env.port}`);
});