const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

function configs(app) {
  app.use(
    cors({
      origin: [
        process.env.ORIGIN,
        "http://localhost:5174",
        "http://localhost:5173",
        "http://localhost:5000",

      ],
    })
  );
  // ...
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
}
module.exports = configs;
