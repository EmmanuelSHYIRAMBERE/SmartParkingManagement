import express from "express";
import { changePwd, forgotPassword } from "../controllers/Authentication";

const authenticate = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     changePwd:
 *       type: object
 *       required:
 *         - password
 *         - newPwd
 *       example:
 *         password: myPassword1
 *         newPwd: myPassword2
 */

/**
 * @swagger
 * /parking/password/changepassword/{id}:
 *   put:
 *     summary: Create a new password
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The user id
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/changePwd'
 *     responses:
 *       201:
 *          description: The new password was successfully changed
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/changePwd'
 *       401:
 *          description: wrong email or password credentials!
 *       500:
 *          description: Internal Server Error
 */

authenticate.put("/changepassword/:id", changePwd);
authenticate.patch("/forgotpassword/:token", forgotPassword);

export default authenticate;
