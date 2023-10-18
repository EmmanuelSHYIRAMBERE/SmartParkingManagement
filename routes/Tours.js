import express from "express";
import multer from "multer"; 

import { verifyToken, admin } from "../middleware";

const toursRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "tour_images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
})

const upload = multer({dest:"tour_images", storage:storage})

import {getOneTour, getTours, addNewTour, deleteTour, updateTour, modifyTour} from "../controllers/Tours";

toursRouter.use(verifyToken, admin)

toursRouter.get("/gettours", getTours)

toursRouter.get("/gettour/:id", getOneTour)

toursRouter.post("/addtour", upload.single("backDropImage"), addNewTour)

toursRouter.delete("/delete/:id", deleteTour)

toursRouter.patch("/updatetour/:id", updateTour)

toursRouter.put("/modifytour/:id", modifyTour)



export default toursRouter;