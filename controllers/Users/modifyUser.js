import { User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const modifyUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOneAndReplace({ _id: id }, req.body);

  if (!user) {
    return next(new errorHandler(`A  user with ID: ${id}, not found`, 404));
  }

  // const image = await cloudinary.uploader.upload(req.file.path);

  const modifiedUser = await Tours.findById(id);

  res.status(200).json({
    messsage: `A user with ID: ${id}, modified successfully to;`,
    ...req.body,
    image: req.file.path,
  });
});
