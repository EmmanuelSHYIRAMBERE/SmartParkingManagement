import { catchAsyncError } from "../../utility";

const PaypackJs = require("paypack-js").default;
require("dotenv").config();

const paypack = PaypackJs.config({
  client_id: process.env.packID,
  client_secret: process.env.packScret,
});
export const cashIn = catchAsyncError(async (req, res) => {
  const response = await paypack.cashin({
    number: req.body.number,
    amount: req.body.amount,
    environment: "production",
  });
  res.status(200).json({
    status: "paid successful",
    data: response.data,
  });
});
export const cashOut = catchAsyncError(async (req, res) => {
  const response = await paypack.cashout({
    number: req.body.number,
    amount: req.body.amount,
    environment: "production",
  });
  res.status(200).json({
    status: "withdrawn successful",
    data: response.data,
  });
});

export const acountTransactions = catchAsyncError(async (req, res) => {
  const response = await paypack.transactions({ offset: 0, limit: 100 });
  res.status(200).json({
    status: "successful transactions",
    data: response.data,
  });
});

export const accountEvents = catchAsyncError(async (req, res) => {
  const response = await paypack.events({ offset: 0, limit: 100 });
  res.status(200).json({
    status: "successful events",
    data: response.data,
  });
});

export const accountInfo = catchAsyncError(async (req, res) => {
  const response = await paypack.me();
  res.status(200).json({
    status: "successful account info",
    data: response.data,
  });
});
