import { User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getAllUser = catchAsyncError(async (req, res, next) => {
  // try {
  const users = await User.find({});

  if (!users) {
    return next(new errorHandler(`Nothing found in database`, 404));
  }

  res.status(200).json(users);
  // } catch (error) {
  //   res.status(500).json({
  //     message: error,
  //   });
  // }
});
