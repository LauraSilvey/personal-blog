var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  author: String,
  title: String,
  entry: String,
});

module.exports = mongoose.model("Post", PostSchema);