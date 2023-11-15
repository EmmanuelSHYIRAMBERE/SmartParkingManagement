import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateParking = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const parkingSlot = await Parkings.findByIdAndUpdate({ _id: id }, req.body);

  if (!parkingSlot) {
    return next(
      new errorHandler(`A parking slot with ID: ${id}, not found`, 404)
    );
  }

  const updatedParking = await Parkings.findById(id);
  res.status(200).json({
    message: `A parking slot with ID: ${id}, updated successfully to;`,
    updatedParking,
  });
});
