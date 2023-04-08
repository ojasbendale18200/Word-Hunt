const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
  title: String,
  category: String,
});

const DataModel = mongoose.model("data", dataSchema);

module.exports = {
  DataModel,
};
