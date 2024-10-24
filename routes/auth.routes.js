const router = require("express").Router();
const express = require("express");
const passport = require("passport");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");

// SIGNUP Google
router.get("/google", passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email" ] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    
    // console.log("PATATA", req)
    //return 
    try {

      if (!req.user) {
        res.status(400).json({ message: "User not found!" });
        return;
      }

      const payload = {
        _id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        address: req.user.address,
        image: req.user.image,
        isAdmin: req.user.isAdmin,
      };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "7d",
      });
      //res.status(200).json({ authToken: authToken });
      res.redirect(`${process.env.ORIGIN}?authToken=${authToken}`)
    } catch (error) {
      next(error)
    }
  }
);

/*router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});*/

// LOGIN Google
router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// POST "/api/auth/signup"
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { email, password, username, firstName, lastName, address, image } =
    req.body;

  if (!email || !password || !username) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm;
  if (!regexPassword.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least one lowercase, one uppercase, a number and between 8 and 16 letters",
    });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ message: "email already in use" });
      return;
    }
    const salt = await bcrypt.genSalt(14);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashPassword,
      username,
      firstName,
      lastName,
      address,
      image,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});
//POST "/api/auth/login"
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      res.status(400).json({ message: "User not found!" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      address: foundUser.address,
      image: foundUser.image,
      isAdmin: foundUser.isAdmin,
    };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});
router.get("/verify", verifyToken, (req, res) => {
  console.log(req.payload);

  res.status(200).json(req.payload);
});

router.get("/user/perfil", verifyToken, (req, res) => {
  res.json({ message: "Private user info" });
});

router.get("/user/admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Admin data" });
});

module.exports = router;
