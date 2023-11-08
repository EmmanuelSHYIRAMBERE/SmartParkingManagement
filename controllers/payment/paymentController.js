import Stripe from "stripe";
import { catchAsyncError } from "../../utility";

const stripe = new Stripe(process.env.stripeSecret);

export const createCustomer = catchAsyncError(async (req, res) => {
  const customer = await stripe.customers.create({
    name: req.body.name,
    email: req.body.email,
  });

  res.status(200).send(customer);
});
