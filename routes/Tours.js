import express from "express";
import { verifyToken, admin } from "../middleware";

const toursRouter = express.Router();

import {getOneTour, getTours, addNewTour, deleteTour, updateTour, modifyTour} from "../controllers/Tours";

toursRouter.use(verifyToken, admin)

toursRouter.get("/gettours", getTours)

toursRouter.get("/gettour/:id", getOneTour)

toursRouter.post("/addtour", addNewTour)

toursRouter.delete("/delete/:id", deleteTour)

toursRouter.patch("/updatetour/:id", updateTour)

toursRouter.put("/modifytour/:id", modifyTour)



export default toursRouter;