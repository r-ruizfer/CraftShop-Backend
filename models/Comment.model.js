const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  text: {
    type: String,
    required: [true, "Some text is required."],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
