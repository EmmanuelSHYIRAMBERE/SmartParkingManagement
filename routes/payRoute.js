import express from "express";

const stripeRoute = express.Router();

import { createCustomer } from "../controllers/payment";

stripeRoute.post("/createCustomer", createCustomer);
// stripeRoute.post('/addCard', paymentController.addNewCard)
// stripeRoute.post('/createCharges', paymentController.createCharges)

export default stripeRoute;
