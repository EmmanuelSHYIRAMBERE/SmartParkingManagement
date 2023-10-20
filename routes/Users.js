import express from "express";
import multer from "multer";
import { verifyToken, admin } from "../middleware";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "user_images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const usersRouter = express.Router();

import {
  signUp,
  logIn,
  getSingleUser,
  getAllUser,
  updateUser,
  modifyUser,
  deleteUser,
} from "../controllers/Users";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - fullNames
 *         - password
 *         - phoneNo
 *         - location
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         fullNames:
 *           type: string
 *           description: The fullNames of the user
 *         image:
 *           type: string
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
 *         id: sE1n_jD2
 *         email: emashyirambere1@gmail.com
 *         fullNames: Emmanuel SHYIRAMBERE
 *         image: images.jpg
 *         password: myPassword1
 *         phoneNo: +25070000000
 *         location: Kigali, Rwanda
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The User managing API
 */

/**
 * @swagger
 * /holidays/users/getusers:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *          description: The list of the users
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 */

usersRouter.get("/getusers", verifyToken, admin, getAllUser);

/**
 * @swagger
 * /holidays/users/getuser/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The user id
 *     responses:
 *       200:
 *          description: The user description by id
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/User'
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
 *     tags: [Users]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *          description: The user was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *          description: Internal Server Error
 */

usersRouter.post("/signup", signUp);

/**
 * @swagger
 * /holidays/users/login:
 *   post:
 *     summary: Log into user account
 *     tags: [Users]
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *          description: The user was successfully authorised
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *          description: Internal Server Error
 */

usersRouter.post("/login", logIn);

usersRouter.put(
  "/modifyuser/:id",
  verifyToken,
  upload.single("image"),
  modifyUser
);

usersRouter.patch(
  "/userupdate/:id",
  verifyToken,
  upload.single("image"),
  updateUser
);

usersRouter.delete("/userdelete/:id", verifyToken, deleteUser);

export default usersRouter;
