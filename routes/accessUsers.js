import express from "express";
import { verifyToken, admin, paginatedResults } from "../middleware";
import profileImagesUpload from "../middleware/profileMulter";
const usersRouter = express.Router();
import { sendEmail } from "../middleware";

import {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/Users";
import { signUp, logIn } from "../controllers/Authentication";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     signUp:
 *       type: object
 *       required:
 *         - email
 *         - fullNames
 *         - phoneNo
 *         - location
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         fullNames:
 *           type: string
 *           description: The fullNames of the user
 *         phoneNo:
 *           type: string
 *           description: The phoneNo of the user
 *         location:
 *           type: string
 *           description: The address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: email@example.com
 *         fullNames: user names
 *         phoneNo: "+25070000000"
 *         location: myAddress
 *         password: myPassword1
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: email@example.com
 *         password: myPassword!
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The user authentication managing API
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user authorization managing API
 */

/**
 * @swagger
 * /parking/users/getusers:
 *   get:
 *     summary: Returns the list of all the users for the sake of admin
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The list of the users found
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/userUpdate'
 *       403:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.get("/getusers", verifyToken, admin, getAllUser);

/**
 * @swagger
 * /parking/users/getuser/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The user id
 *     responses:
 *       200:
 *          description: The user found by id
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       204:
 *          description: No any user in the database
 *       403:
 *          description: The user not authorised
 *       404:
 *          description: The user was not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.get("/getuser/:id", verifyToken, getSingleUser);

/**
 * @swagger
 * /parking/users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *     responses:
 *       201:
 *          description: The user was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       500:
 *          description: Internal Server Error
 */

usersRouter.post("/signup", signUp);

/**
 * @swagger
 * /parking/users/login:
 *   post:
 *     summary: Log into user account
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *          description: The user was successfully authorised
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       403:
 *          description: Wrong email or password
 *       500:
 *          description: Internal Server Error
 */

usersRouter.post("/login", logIn);

/**
 * @swagger
 * /parking/users/userupdate/{id}:
 *   put:
 *     summary: Update the user data by id
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            multipart/form-data:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The user id
 *     responses:
 *       200:
 *          description: The user was modified successfully
 *          content:
 *             multipart/form-data:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       204:
 *          description: No any user in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The user was not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.put(
  "/userupdate/:id",
  verifyToken,
  profileImagesUpload,
  updateUser
);

/**
 * @swagger
 * /parking/users/userdelete/{id}:
 *   delete:
 *     summary: Delete the user data by id
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The user id
 *     responses:
 *       200:
 *          description: The user was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       204:
 *          description: No any user in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The user was not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.delete("/userdelete/:id", verifyToken, deleteUser);

export default usersRouter;
