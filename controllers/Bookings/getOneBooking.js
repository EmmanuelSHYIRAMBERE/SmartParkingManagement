import { Reservations } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getBooking = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Reservations.findOne({ _id: id });

  if (!booking) {
    return next(
      new errorHandler(`A reservation with ID: ${id}, not found`, 404)
    );
  }

  res.status(200).json({ booking });
});
