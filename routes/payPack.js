import express from "express";

const packRouter = express.Router();

import {
  cashIn,
  cashOut,
  acountTransactions,
  accountEvents,
  accountInfo,
} from "../controllers/payment/paypack";
import { admin, verifyToken } from "../middleware";

packRouter.get("/cashin", verifyToken, cashIn);

packRouter.get("/cashout", verifyToken, admin, cashOut);

packRouter.get("/transactions", verifyToken, admin, acountTransactions);

packRouter.get("/events", verifyToken, admin, accountEvents);

packRouter.get("/account", verifyToken, admin, accountInfo);

export default packRouter;
