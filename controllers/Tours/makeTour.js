import { Tours } from "../../models";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const addNewTour = async (req, res) => {
    try {
        // const backDropImage = await cloudinary.uploader.upload(req.file.path);
        // console.log(backDropImage);
        const tour = await Tours.create({
            ...req.body,
            backDropImage: req.file.path
        })
        res.status(201).json(tour)
        
    } catch (error) {
        console.error("Error adding a new tour:", error);
        res.status(500).json({
            message: error,
        })
        
    }
};