const express = require("express");
const { DataModel } = require("../Models/data.model");
const dataRouter = express.Router();

dataRouter.get("/", async (req, res) => {
  try {
    const data = await DataModel.find();

    if (data.length) {
      res.status(200).send({ data: data, msg: "Data exists" });
    } else {
      res.status(200).send({ data: data, msg: "Data  does not exists" });
    }
  } catch (error) {
    res.status(400).send({
      message: `Please Try Again Something Went Wrong!\n , ${error.message}`,
    });
  }
});

module.exports = {
  dataRouter
};
