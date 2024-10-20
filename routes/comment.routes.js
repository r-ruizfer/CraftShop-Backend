const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");
const Comment = require("../models/Comment.model.js");
const User = require("../models/User.model.js");

//POST Comment
router.post("/", async (req, res, next) => {
  try {
    const response = await Comment.create({
      ...req.body,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});
//DELETE Comment
router.delete("/:commentId", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(201).json({ message: "Comment Deleted" });
  } catch (error) {
    next(error);
  }
});
router.get("/products/:productId", async (req, res, next) => {
  try {
    const response = await Comment.find({ product: req.params.productId }).populate("user")
    res.send(response);
  } catch (error) {
    next(error);
  }
});
router.get("/users/:userId", async (req, res, next) => {
  try {
    const response = await Comment.find({ userId: req.params.userId });
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
