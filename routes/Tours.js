import express from "express";
import multer from "multer";
import path from "path";
import { verifyToken, admin } from "../middleware";
import { uploads } from "../middleware/multer";

const toursRouter = express.Router();

import {
  getOneTour,
  getTours,
  addNewTour,
  deleteTour,
  updateTour,
  modifyTour,
} from "../controllers/Tours";

toursRouter.post("/addtour", uploads, addNewTour);

toursRouter.get("/gettours", verifyToken, admin, getTours);

toursRouter.get("/gettour/:id", getOneTour);

toursRouter.delete("/delete/:id", deleteTour);

toursRouter.patch("/updatetour/:id", updateTour);

toursRouter.put("/modifytour/:id", modifyTour);

export default toursRouter;
