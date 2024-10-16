const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  Title: {
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