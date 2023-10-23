import express from "express";

const contactsRouter = express.Router();

import {
  makeContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
} from "../controllers/Contacts";
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
 *     contacts:
 *       type: object
 *       required:
 *         - emails
 *         - replying
 *       properties:
 *         emails:
 *           type: string
 *           description: The email of the user
 *         replying:
 *           type: string
 *           description: The message to be communicated
 *       example:
 *         emails: "emashyirambere@gmail.com"
 *         replying: "Hello everyone, first all thanks for this project."
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: The contacts managing API
 */

/**
 * @swagger
 * /holidays/contacts/makecontact:
 *   post:
 *     summary: Write a new communication reply
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *     responses:
 *       201:
 *          description: The new reply information was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *       500:
 *          description: Internal Server Error
 */

contactsRouter.post("/makecontact", verifyToken, makeContact);

/**
 * @swagger
 * /holidays/contacts/getcontacts:
 *   get:
 *     summary: Returns the all contacts data
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The list of the contacts data found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/contacts'
 *       204:
 *          description: No any contact data stored in the database
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

contactsRouter.get("/getcontacts", verifyToken, admin, getContacts);

/**
 * @swagger
 * /holidays/contacts/getcontact/{id}:
 *   get:
 *     summary: Get the contact data by id
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The contact id
 *     responses:
 *       200:
 *          description: The contact information found by id successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *       204:
 *          description: No content in the database
 *       404:
 *          description: The contact of such id was not found
 *       500:
 *          description: Internal Server Error
 */

contactsRouter.get("/getcontact/:id", verifyToken, getContact);
/**
 * @swagger
 * /holidays/contacts/updatecontact/{id}:
 *   patch:
 *     summary: Update the contact data by id
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The contact id
 *     responses:
 *       200:
 *          description: The contact information was modified successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *       204:
 *          description: No content in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The contact data was not found
 *       500:
 *          description: Internal Server Error
 */

contactsRouter.patch("/updatecontact/:id", verifyToken, updateContact);
/**
 * @swagger
 * /holidays/contacts/deletecontact/{id}:
 *   delete:
 *     summary: Delete the contact data by id
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The contact data id
 *     responses:
 *       200:
 *          description: The current contact data was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *       204:
 *          description: No any contact data stored in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The contact data was not found
 *       500:
 *          description: Internal Server Error
 */

contactsRouter.delete("/deletecontact/:id", verifyToken, deleteContact);

export default contactsRouter;
