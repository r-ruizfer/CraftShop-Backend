const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  price: Number,
  paymentIntentId: String,
  clientSecret: String,
  status: {
    type: String,
    enum: ["incomplete", "succeeded"],
    default: "incomplete",
  },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
