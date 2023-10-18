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
})

const upload = multer({dest:"user_images", storage:storage})

const usersRouter = express.Router()

import { signUp, logIn, getSingleUser, getAllUser, updateUser, modifyUser, deleteUser } from "../controllers/Users";


usersRouter.post('/signup', signUp)

usersRouter.post('/login', logIn)

usersRouter.patch('/userupdate/:id', verifyToken, upload.single("image"), updateUser)

usersRouter.put('/modifyuser/:id', verifyToken, upload.single("image"), modifyUser)

usersRouter.delete('/userdelete/:id', verifyToken, deleteUser)

usersRouter.get('/getuser/:id', verifyToken, getSingleUser)

usersRouter.get('/getusers', verifyToken, admin, getAllUser)




export default usersRouter