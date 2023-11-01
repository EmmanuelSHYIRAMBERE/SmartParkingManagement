import { Tours } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteTour = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const tour = await Tours.findByIdAndDelete({ _id: id });

  if (!tour) {
    return next(new errorHandler(`A tour with ID: ${id}, not found`, 404));
  }

  res.status(200).json({
    message: `Tour with ID: ${id}, deleted successfully!`,
  });
});
