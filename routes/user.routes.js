const express = require("express")
const router = express.Router()
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model")



router.get("/:id", verifyToken, async (req, res, next) => {
    try {
      const response = await User.findById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });
  

  router.patch("/:userId", async (req, res) =>{
    try {
       const response=  await User.findByIdAndUpdate(req.params.userId, {
        ...req.body
    }, {new: true})
        res.status(200).json(response)
    } catch (error) {
        next (error)
    }
})


router.delete("/:userId", async (req, res) =>{
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).send()
    } catch (error) {
        next (error)
    }
})


  module.exports = router;