import { Booking } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getBookings = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.find({});

  if (!bookings) {
    return next(new errorHandler(`Nothing found in database`, 404));
  }

  res.status(200).json(bookings);
});
