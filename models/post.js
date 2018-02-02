var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  title: String,
  entry: String,
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Post", PostSchema);