import { Tours } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateTour = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const tour = await Tours.findByIdAndUpdate({ _id: id }, req.body);

  if (!tour) {
    return next(new errorHandler(`A tour with ID: ${id}, not found`, 404));
  }

  const updatedTour = await Tours.findById(id);
  res.status(200).json({
    message: `A tour with ID: ${id}, updated successfully to;`,
    updatedTour,
  });
});
