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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     momoPay:
 *       type: object
 *       required:
 *         - number
 *         - amount
 *       properties:
 *         number:
 *           type: string
 *           description: The phone nunber of a user who is going to pay the booking amount
 *         amount:
 *           type: string
 *           description: The required amount for the booking
 *       example:
 *         number: "07XXXXXXX"
 *         amount: 100
 */

/**
 * @swagger
 * tags:
 *   name: momoPay
 *   description: The mobile payment managing API
 */

/**
 * @swagger
 * /holidays/momo/cashin:
 *   get:
 *     summary: Allow user to pay using either MTN or Airtel/Tigo simcard number for the required amount of the booking made
 *     tags: [momoPay]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/momoPay'
 *     responses:
 *       200:
 *          description: The user is succcessfully paid for the required amount for the booking
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/momoPay'
 *       204:
 *          description: No any booking in the database
 *       404:
 *          description: The booking not found
 *       500:
 *          description: Internal Server Error
 */

packRouter.get("/cashin", verifyToken, cashIn);

/**
 * @swagger
 * /holidays/momo/cashout:
 *   get:
 *     summary: Allow admin to withdraw amount of money using either MTN or Airtel/Tigo simcard number
 *     tags: [momoPay]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/momoPay'
 *     responses:
 *       200:
 *          description: The amount is succcessfully withdrawn
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/momoPay'
 *       404:
 *          description: There is an insufficients fund on your account
 *       500:
 *          description: Internal Server Error
 */
packRouter.get("/cashout", verifyToken, admin, cashOut);

/**
 * @swagger
 * /holidays/momo/transactions:
 *   get:
 *     summary: Allow an admin to check transactions made by customer and company
 *     tags: [momoPay]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The admin checks transactions succesfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/momoPay'
 *       404:
 *          description: Transactions not yet made
 *       500:
 *          description: Internal Server Error
 */
packRouter.get("/transactions", verifyToken, admin, acountTransactions);

/**
 * @swagger
 * /holidays/momo/events:
 *   get:
 *     summary: Allow an admin to check all events made to the system
 *     tags: [momoPay]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The admin checks events succesfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/momoPay'
 *       500:
 *          description: Internal Server Error
 */
packRouter.get("/events", verifyToken, admin, accountEvents);

/**
 * @swagger
 * /holidays/momo/account:
 *   get:
 *     summary: Allow an admin to checks the system's useful data including mtn and airtel balances
 *     tags: [momoPay]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The admin is successfully checks the system's useful data
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/momoPay'
 *       500:
 *          description: Internal Server Error
 */
packRouter.get("/account", verifyToken, admin, accountInfo);

export default packRouter;
