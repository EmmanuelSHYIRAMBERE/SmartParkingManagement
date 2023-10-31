import { Tours } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getTours = catchAsyncError(async (req, res, next) => {
  const tours = await Tours.find({});

  if (!tours) {
    return next(new errorHandler(`Nothing found in database`, 404));
  }

  res.status(200).json(tours);
});
