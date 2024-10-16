const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const productRoutes = require("./product.routes");
router.use("/products", productRoutes);

const commentRoutes = require("./comment.routes");
router.use("/comments", commentRoutes);

const userRoutes = require("./user.routes");
router.use("/users", userRoutes);

module.exports = router;
