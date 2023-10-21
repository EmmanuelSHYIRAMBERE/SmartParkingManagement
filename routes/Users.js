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
 *     signUp:
 *       type: object
 *       required:
 *         - email
 *         - fullNames
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
 *         id: it automatically generated, i.e., no need
 *         email: emmanuelshyirambere@gmail.com
 *         fullNames: Emmanuel SHYIRAMBERE
 *         password: myPassword1
 *         phoneNo: "+25070000000"
 *         location: Kigali, Rwanda
 *         role: user
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
 *         id: it automatically generated, i.e., no need
 *         email: emmanuelshyirambere@gmail.com
 *         fullNames: Emmanuel SHYIRAMBERE
 *         image: images.jpg
 *         password: myPassword1
 *         phoneNo: "+25070000000"
 *         location: Kigali, Rwanda
 *         role: user
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
 *         email: emashyirambere@gmail.com
 *         password: myPassword
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 */

/**
 * @swagger
 * /holidays/users/getusers:
 *   get:
 *     summary: Returns the list of all the users for the sake of admin
 *     tags: [Users]
 *     parameters:
 *        - in: path
 *          name: token
 *          schema:
 *             type: string
 *          required: true
 *          description: The user access token
 *     responses:
 *       200:
 *          description: The list of the users found
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *       204:
 *          description: No any user in the database
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
 *        - in: path
 *          name: token
 *          schema:
 *             type: string
 *          required: true
 *          description: The user access
 *     responses:
 *       200:
 *          description: The user found by id
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/User'
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
 *     tags: [Users]
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
 *     tags: [Users]
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
 * /holidays/users/modifyuser/{id}:
 *   put:
 *     summary: Modify the structure of the user by id
 *     tags: [Users]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
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

usersRouter.put(
  "/modifyuser/:id",
  verifyToken,
  upload.single("image"),
  modifyUser
);

/**
 * @swagger
 * /holidays/users/userupdate/{id}:
 *   patch:
 *     summary: Update the user data by id
 *     tags: [Users]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
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

usersRouter.patch(
  "/userupdate/:id",
  verifyToken,
  upload.single("image"),
  updateUser
);

/**
 * @swagger
 * /holidays/users/userdelete/{id}:
 *   delete:
 *     summary: Delete the user data by id
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
 *          description: The user was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/User'
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
