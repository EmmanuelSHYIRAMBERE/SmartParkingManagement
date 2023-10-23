import { Tours } from "../../models/tourModel.js";
import tourImagesUpload from "../../middleware/multer.js";
import cloudinary from "../../utility/cloudinary.js";
import path from "path";

export const addNewTour = async (req, res) => {
  try {
    // const imageResult = cloudinary.uploader.upload(req.file.path);
    console.log(req.files);
    // const backDropImage = tourImagesUpload.single(req.files['backDropImage'][0])

    // for ( var index = 1; index <= req.files['gallery'].length; index++ )

    // const gallery = tourImagesUpload.array(gallery)

    const newTour = await Tours.create({
      ...req.body,
      backDropImage: req.files.path,
      gallery: req.files.path,
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
