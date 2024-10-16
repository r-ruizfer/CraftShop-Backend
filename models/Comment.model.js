const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: [true, "Some text is required."],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
