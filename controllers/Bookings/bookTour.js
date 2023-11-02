import { Booking } from "../../models";
import { Tours } from "../../models";
import { User } from "../../models";
import { receiveBookingEmail } from "../../middleware";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const bookTour = catchAsyncError(async (req, res, next) => {
  const tourID = req.body.tourID;
  const tour = await Tours.findById({ _id: tourID });
  if (!tour) {
    return next(new errorHandler(`Nothing found in database`, 404));
  }

  const userID = req.body.userID;
  const user = await User.findById({ _id: userID });
  if (!user) {
    return next(
      new errorHandler(`A user with ID: ${userID} is not found`, 404)
    );
  }

  const bookingTour = await Booking.create(req.body);

  receiveBookingEmail(user.email, user.fullNames);
  res.status(201).json({
    message: `A tour with ID: ${tourID} is successfully booked`,
    bookingData: { bookingTour },
    tourData: { tour },
    userData: { user },
  });
});
