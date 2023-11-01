import { Booking } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const deleteBooking = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findByIdAndDelete({ _id: id });

  if (!booking) {
    return next(new errorHandler(`A booking with ID: ${id}, not found`, 404));
  }

  res.status(200).json({
    message: `A booking with ID: ${id}, deleted successfully!`,
  });
});
