import { User } from "../../models";
import cloudinary from "../../utility/cloudinary";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate({ _id: id }, req.body);

  if (!user) {
    return next(new errorHandler(`A  user with ID: ${id}, not found`, 404));
  }

  const image = await cloudinary.uploader.upload(req.file.path);

  res.status(200).json({
    message: `A user with ID: ${id}, updated successfully to;`,
    ...req.body,
    image: image.secure_url,
  });
});
