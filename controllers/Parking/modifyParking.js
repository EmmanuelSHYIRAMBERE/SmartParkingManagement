import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const modifyParking = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const parkingSlot = await Parkings.findOneAndReplace({ _id: id }, req.body);

  if (!parkingSlot) {
    return next(
      new errorHandler(`A parking slot with ID: ${id}, not found`, 404)
    );
  }

  const modifiedParking = await Parkings.findById(id);
  res.status(200).json({
    messsage: `A parking slot with ID: ${id}, modified successfully to;`,
    modifiedParking,
  });
});
