import express from "express";
import { verifyToken, admin } from "../middleware";

const testimoniesRouter = express.Router();

import {
  addTestimony,
  deleteTestimony,
  updateTestimony,
  getTestimonies,
} from "../controllers/Testmonies";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     testimonies:
 *       type: object
 *       required:
 *         - body
 *         - userID
 *       properties:
 *         body:
 *           type: string
 *           description: The message body of the testimony
 *         userID:
 *           type: string
 *           description: The id of the user
 *       example:
 *         body: "The tour was terrible and amazing"
 *         userID: "ed43BGb_ns1En32b"
 */

/**
 * @swagger
 * tags:
 *   name: Testimonies
 *   description: The testimonies managing API
 */

/**
 * @swagger
 * /holidays/testimonies/addtestimony:
 *   post:
 *     summary: Create a new testimony information
 *     tags: [Testimonies]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/testimonies'
 *     responses:
 *       201:
 *          description: The new testimony information was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/testimonies'
 *       500:
 *          description: Internal Server Error
 */

testimoniesRouter.post("/addtestimony", verifyToken, addTestimony);

/**
 * @swagger
 * /holidays/testimonies/gettestimonies:
 *   get:
 *     summary: Returns the list of all the tours
 *     tags: [Testimonies]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The all information of the testimonies found succesfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/testimonies'
 *       204:
 *          description: No content in the database
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

testimoniesRouter.get("/gettestimonies", verifyToken, getTestimonies);

/**
 * @swagger
 * /holidays/testimonies/deletetestimony/{id}:
 *   delete:
 *     summary: Delete the testimony data by id
 *     tags: [Testimonies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The testimony id
 *     responses:
 *       200:
 *          description: The testimony data was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/testimonies'
 *       204:
 *          description: No content in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The testimony data was not found
 *       500:
 *          description: Internal Server Error
 */

testimoniesRouter.delete("/deletetestimony/:id", verifyToken, deleteTestimony);

/**
 * @swagger
 * /holidays/testimonies/updatetestimony/{id}:
 *   patch:
 *     summary: Update the testimony data by id
 *     tags: [Testimonies]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/testimonies'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The testimony id
 *     responses:
 *       200:
 *          description: The testimony information was modified successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/testimonies'
 *       204:
 *          description: No content in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The testimony data was not found
 *       500:
 *          description: Internal Server Error
 */

testimoniesRouter.patch("/updatetestimony/:id", verifyToken, updateTestimony);

export default testimoniesRouter;
