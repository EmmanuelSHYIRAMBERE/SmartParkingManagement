import { User } from "../../models";
import dotenv from "dotenv";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate({ _id: id }, req.body);

    if (!user) {
      return res.status(404).json({
        message: `A  user with ID: ${id}, not found`,
      });
    }

    // const image = await cloudinary.uploader.upload(req.file.path);

    const modifiedUser = await User.findById(id);

    res.status(200).json({
      message: `A user with ID: ${id}, updated successfully to;`,
      ...req.body,
      // image: image.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
