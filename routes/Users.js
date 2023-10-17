import express from "express";
import { verifyToken, admin } from "../middleware";

const usersRouter = express.Router()

import { signUp, logIn, getAllUser } from "../controllers/Users";

usersRouter.post('/signup', signUp)


usersRouter.post('/login', logIn)

usersRouter.get('/getusers', verifyToken, admin, getAllUser)




export default usersRouter