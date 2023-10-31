import { Booking } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const updateBooking = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findByIdAndUpdate({ _id: id }, req.body);

  if (!booking) {
    return next(new errorHandler(`A booking with ID: ${id}, not found`, 404));
  }

  const updatedBooking = await Booking.findById(id);
  res.status(200).json({
    message: `A booking with ID: ${id}, updated successfully to;`,
    updatedBooking,
  });
});
