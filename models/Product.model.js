const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "a Descritpion is required."],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
   set: (value) => (value / 100).toFixed(2),
   get: (value) => Math.round(value * 100),
  },
  image: {
    type: String,
    required: [true, "you need to add an image"],
  },
  category: {
    type: String,
    required: [true, "you need at least one category"],
    enum: ["Prints", "Stickers", "Merchandising", "Painting"],
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
