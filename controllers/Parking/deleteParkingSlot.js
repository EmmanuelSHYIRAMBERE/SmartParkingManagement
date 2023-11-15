import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteParkingSlot = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const parkingSlot = await Parkings.findByIdAndDelete({ _id: id });

  if (!parkingSlot) {
    return next(
      new errorHandler(`A parking slot with ID: ${id}, not found`, 404)
    );
  }

  res.status(200).json({
    message: `A parking slot with ID: ${id}, deleted successfully!`,
  });
});
