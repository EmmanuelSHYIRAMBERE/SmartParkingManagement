import { Testimony } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteTestimony = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const testimony = await Testimony.findByIdAndDelete({ _id: id });

  if (!testimony) {
    return next(new errorHandler(`A testimony with ID: ${id}, not found`, 404));
  }

  res.status(204).json({
    message: `A testimony with ID: ${id}, deleted successfully!`,
  });
});
