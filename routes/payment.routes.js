
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // make sure to add your Stripe Secret Key to the .env
const Payment = require("../models/Payment.model.js")
const Product = require("../models/Product.model");

router.post("/create-payment-intent", async (req, res, next) => {

  const productId = req.body._id; // this is how we will receive the productId the user is trying to purchase. This can also later be set to receive via params.
  
  try {

    // TODO . this is where you will later get the correct price to be paid

// this is where you will get the correct price to be paid
const product = await Product.findById(productId)
const priceToPay = product.price // if not stored in cents, make sure to convert them to cents

// ... payment intent creation

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceToPay, // this is an example for an amount of 14 EUR used for testing.
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // TODO on part 2. this is where you will later create a Payment Document later
    await Payment.create({
      price: priceToPay,
      product: productId,
      status: "incomplete",
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      // buyer: req.payload // example to add who bought the product (not done in this example)
    })

    res.send({
      clientSecret: paymentIntent.client_secret, // the client secret will be sent to the FE after the stripe payment intent creation
    });
    
  } catch (error) {
    console.log(error)
    next(error)
  }
});


router.patch("/update-payment-intent", async (req, res, next) => {
  const { clientSecret, paymentIntentId } = req.body;

  try {

    await Payment.findOneAndUpdate({
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId,
    },{ 
      status: "succeeded" 
    });

    res.status(200).json();

  } catch (error) {
    next(error);
  }
});


module.exports = router