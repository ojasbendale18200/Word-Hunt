const express = require("express");
const useRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const { UserModel } = require("../Models/user.model");
require("dotenv").config();

useRouter.get("/", async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.send({ message: `All Users Data`, data: allUsers });
  } catch (error) {
    res.status(400).send({
      message: `Please Try Again Something Went Wrong!\n , ${error.message}`,
    });
  }
})

useRouter.post("/register", async (req, res) => {
  const { name, email, password, status } = req.body;
  const isUserPresent = await UserModel.find({ email: email });
  if (isUserPresent.length) {
    return res.send({
      message: "User AlreadyExists",
      data: isUserPresent[0].email,
    });
  }
  try {
    bcrypt.hash(password, 5, async (err, result) => {
      if (result) {
        const user = new UserModel({
          email,
          password: result,
          name,
          status,
        });
        await user.save();
        res.status(200).send({ msg: "New User Registered" });
      } else {
        res.status(400).send({ msg: "Wrong Credential" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
    console.log(error);
  }
});

useRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    const hashed_pass = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.status(200).send({
            msg: "User login successful",
            token: token,
            name: user[0].name,
          });
        } else {
          res.status(400).send({ msg: "Wrong Credential" });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

module.exports = { useRouter };
