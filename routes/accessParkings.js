import express from "express";
const parkingRouter = express.Router();

import {
  addNewParking,
  deleteParkingSlot,
  getOneParking,
  getTotalParking,
  modifyParking,
  updateParking,
} from "../controllers/Parking";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     parkings:
 *       type: object
 *       required:
 *         - parkingNo
 *         - Amount
 *         - Address
 *         - building
 *       properties:
 *         parkingNo:
 *           type: string
 *           description: The serial number of the parking slot
 *         Amount:
 *           type: string
 *           format: binary
 *           description: The amount for a single hour in the parking slot
 *         Address:
 *           type: string
 *           description: The location of the parking
 *         building:
 *           type: string
 *           description: A building a parking located
 *       example:
 *         parkingNo: "P123"
 *         Amount: "$5.00"
 *         Address: "123 Main Street"
 *         building: "Parking Garage A"
 */

/**
 * @swagger
 * tags:
 *   name: parkings
 *   description: The parkings managing API
 */

/**
 * @swagger
 * /parking/parkings/addNewParking:
 *   post:
 *     summary: Create a new parking slot's data
 *     tags: [parkings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *     responses:
 *       201:
 *          description: The new parking slot data was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.post("/addNewParking", addNewParking);

/**
 * @swagger
 * /parking/parkings/getTotalParking:
 *   get:
 *     summary: Returns the list of the total parking slots
 *     tags: [parkings]
 *     responses:
 *       200:
 *          description: The list of the tours found
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found.
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/getTotalParking", getTotalParking);

/**
 * @swagger
 * /parking/parkings/getOneParking/{id}:
 *   get:
 *     summary: Get a single parking slot by id
 *     tags: [parkings]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The parking slot id
 *     responses:
 *       200:
 *          description: The parking slot found by id
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/getOneParking/:id", getOneParking);

/**
 * @swagger
 * /parking/parkings/deleteParkingSlot/{id}:
 *   delete:
 *     summary: Delete the parking slot's data by id
 *     tags: [parkings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The parking slot id
 *     responses:
 *       200:
 *          description: The parking slot was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.delete("/deleteParkingSlot/:id", deleteParkingSlot);

/**
 * @swagger
 * /parking/parkings/updateParking/{id}:
 *   put:
 *     summary: Update the parking slot's data by id
 *     tags: [parkings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The parking id
 *     responses:
 *       200:
 *          description: The parking slot's data was modified successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.put("/updateParking/:id", updateParking);

parkingRouter.patch("/modifyParking/:id", modifyParking);

export default parkingRouter;
