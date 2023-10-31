import { Testimony } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getTestimonies = catchAsyncError(async (req, res, next) => {
  const testimonies = await Testimony.find({});

  if (!testimonies) {
    return next(new errorHandler(`Nothing found in database`, 404));
  }

  res.status(200).json(testimonies);
});
