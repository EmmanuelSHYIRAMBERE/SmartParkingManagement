import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { Tours } from "../../models/tourModel.js";
import multer from "multer";
import path from "path";

dotenv.config();

cloudinary.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addNewTour = async (req, res) => {
  try {
    // const images = await cloudinary.uploader.upload(req.file.path);

    const newTour = await Tours.create({
      ...req.body,
      backDropImage: req.file.path,
    });
    return res.status(201).json({
      status: "Tour created successfully",
      data: { newTour },
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
