import express from "express";
import { verifyToken } from "../middleware";
import { changePwd } from "../controllers/Authentication/passwordManage";

const  authenticate = express.Router()


authenticate.post("/", verifyToken, changePwd)


export default authenticate