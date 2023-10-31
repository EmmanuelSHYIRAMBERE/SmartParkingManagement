import { Tours } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const modifyTour = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const tour = await Tours.findOneAndReplace({ _id: id }, req.body);

  if (!tour) {
    return next(new errorHandler(`A tour with ID: ${id}, not found`, 404));
  }

  const modifiedTour = await Tours.findById(id);
  res.status(200).json({
    messsage: `A tour with ID: ${id}, modified successfully to;`,
    modifiedTour,
  });
});
