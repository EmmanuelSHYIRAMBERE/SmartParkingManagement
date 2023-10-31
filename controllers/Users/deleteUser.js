import { User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete({ _id: id });

  if (!user) {
    return next(new errorHandler(`A  user with ID: ${id}, not found`, 404));
  }

  res.status(204).json({
    message: `A user with ID: ${id}, deleted successfully!`,
  });
});
