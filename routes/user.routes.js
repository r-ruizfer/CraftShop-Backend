const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.params.id).populate(
      "wishlistedItems"
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      {
        ...req.body,
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id/products/:productId/addWishlist",
  verifyToken,
  async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { wishlistedItems: req.params.productId } },
        { new: true }
      ).populate("wishlistedItems");

      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/:id/products/:productId/removeWishlist",
  verifyToken,
  async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { wishlistedItems: req.params.productId } },
        { new: true }
      ).populate("wishlistedItems");

      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
