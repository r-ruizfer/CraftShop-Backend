require("dotenv").config();
require("./db");

const express = require("express");
const passport = require("passport");
const session = require("express-session");

const app = express();

require("./config/passport");
require("./config")(app);


app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

require("./error-handling")(app);

module.exports = app;
