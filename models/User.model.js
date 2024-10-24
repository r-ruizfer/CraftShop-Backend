const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://static.wikia.nocookie.net/joke-battles/images/d/df/Gigachad.png/revision/latest?cb=20230812064835",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    wishlistedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
