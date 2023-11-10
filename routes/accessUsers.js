import express from "express";
import { verifyToken, admin, paginatedResults } from "../middleware";
import profileImagesUpload from "../middleware/profileMulter";
const usersRouter = express.Router();
import { sendEmail } from "../middleware";

import {
  signUp,
  logIn,
  getSingleUser,
  getAllUser,
  updateUser,
  modifyUser,
  deleteUser,
} from "../controllers/Users";
import { User } from "../models";

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
 *         - password
 *         - phoneNo
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         fullNames:
 *           type: string
 *           description: The fullNames of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         phoneNo:
 *           type: string
 *           description: The phoneNo of the user
 *       example:
 *         email: email@example.com
 *         fullNames: example ACCOUNT
 *         password: myPassword1
 *         phoneNo: "+25070000000"
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
 *         password: myPassword
 *     userEdit:
 *       type: object
 *       required:
 *         - email
 *         - fullNames
 *         - image
 *         - password
 *         - phoneNo
 *         - location
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         fullNames:
 *           type: string
 *           description: The fullNames of the user
 *         image:
 *           type: string
 *           format: binary
 *           description: The profile picture of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         phoneNo:
 *           type: string
 *           description: The phoneNo of the user
 *         location:
 *           type: string
 *           description: The location of the user
 *         role:
 *           type: string
 *           description: The role of the user i.e., user or admin
 *       example:
 *         email: email@example.com
 *         fullNames: example ACCOUNT
 *         image: images.jpg
 *         password: myPassword1
 *         phoneNo: "+25070000000"
 *         location: Kigali, Rwanda
 *         role: user
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The user login and signup managing API
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user accesibility managing API
 */

/**
 * @swagger
 * /holidays/users/getusers:
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
 *                   $ref: '#/components/schemas/userEdit'
 *       204:
 *          description: No any user in the database
 *       403:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.get(
  "/getusers",
  verifyToken,
  admin,
  paginatedResults(User),
  getAllUser
);

/**
 * @swagger
 * /holidays/users/getuser/{id}:
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
 *                   $ref: '#/components/schemas/userEdit'
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
 * /holidays/users/signup:
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
 * /holidays/users/login:
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

// const upload = multer({ dest: "images" });

/**
 * @swagger
 * /holidays/users/userupdate/{id}:
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
 *                   $ref: '#/components/schemas/userEdit'
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
 *                   $ref: '#/components/schemas/userEdit'
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
 * /holidays/users/userdelete/{id}:
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
 *                   $ref: '#/components/schemas/userEdit'
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
