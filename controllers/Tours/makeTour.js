import { Tours } from "../../models/tourModel.js";
import cloudinary from "../../utility/cloudinary.js";
import path from "path";

export const addNewTour = async (req, res) => {
  try {
    // const imageResult = cloudinary.uploader.upload(
    //   req.file.path,
    //   function (err, result) {
    //     if (err) {
    //       console.log(err);
    //       return result.status(500).json({ success: false, message: "Error" });
    //     }

    //     result
    //       .status(201)
    //       .json({ success: true, message: "Uploaded", data: result });
    //   }
    // );

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
