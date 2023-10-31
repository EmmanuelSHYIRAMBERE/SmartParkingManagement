import { Testimony } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateTestimony = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const testimony = await Testimony.findByIdAndUpdate({ _id: id }, req.body);

  if (!testimony) {
    return next(new errorHandler(`A testimony with ID: ${id}, not found`, 404));
  }

  const updatedTestimony = await Testimony.findById(id);
  res.status(200).json({
    message: `A testimony with ID: ${id}, updated successfully to;`,
    updatedTestimony,
  });
});
