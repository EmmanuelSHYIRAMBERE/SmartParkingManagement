import { User, Admin } from "../../models";
import cloudinary from "../../utility/cloudinary";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Check in the User database
  const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  // If not found in the User database, check in the Admin database
  if (!user) {
    const admin = await Admin.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!admin) {
      return next(new errorHandler(`A user with ID: ${id} not found`, 404));
    }

    // You might need to modify the response based on your data structure
    const adminImage = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json({
      message: `A user with ID: ${id}, updated successfully to:`,
      ...req.body,
      image: adminImage.secure_url,
    });

    return;
  }

  // You might need to modify the response based on your data structure
  const userImage = await cloudinary.uploader.upload(req.file.path);
  res.status(200).json({
    message: `A user with ID: ${id}, updated successfully to:`,
    ...req.body,
    image: userImage.secure_url,
  });
});
