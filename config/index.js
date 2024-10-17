const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

function configs (app){
  app.use(
    cors({
<<<<<<< HEAD
      origin: ["http://localhost:5173"],
=======
      origin: ["http://localhost:5174","http://localhost:5173"],
>>>>>>> cf2e1f9fcfbff214608a236596d2c7daa0aaa68a
    })
  );
  // ...
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());


}
module.exports = configs