var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  title: String,
  entry: String,
  created: {type: Date, default: Date.now},
  author: {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

module.exports = mongoose.model("Post", PostSchema);