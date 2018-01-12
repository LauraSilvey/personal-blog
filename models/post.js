var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  name: String,
  title: String,
  entry: String,
});

module.exports = mongoose.model("Post", PostSchema);