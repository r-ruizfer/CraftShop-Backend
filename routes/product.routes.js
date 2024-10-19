const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");
const Product = require("../models/Product.model");

//Create a single product

router.post("/", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Product.create({
      ...req.body,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

//Return all products
router.get("/", (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(202).json(products);
    })

    .catch((error) => {
      next(error);
    });
});

// return by title
router.get("/search", async (req, res, next) => {
  try {
    console.log(req.query);
    const response = await Product.find({
      title: { $regex: req.query.title, $options: "i" },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
// Return a single product
router.get("/:productId", async (req, res, next) => {
  try {
    const response = await Product.findById(req.params.productId);
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

// Update details of a single product

router.put("/:productId", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Product.findByIdAndUpdate(
      req.params.productId,
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

//Delete a single product
router.delete(
  "/:productId",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.productId);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
