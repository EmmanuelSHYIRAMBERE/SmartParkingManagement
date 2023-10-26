import { Booking } from "../../models";
import { Tours } from "../../models";
import { User } from "../../models";
import { receiveBookingEmail } from "../../middleware";

export const bookTour = async (req, res) => {
  try {
    const tourID = req.body.tourID;
    const tour = await Tours.findById({ _id: tourID });
    if (!tour) {
      return res.status(401).json({
        message: `A tour with ID: ${tourID} is not found`,
      });
    }

    const userID = req.body.userID;
    const user = await User.findById({ _id: userID });
    if (!user) {
      return res.status(404).json({
        message: `A user with ID: ${userID} is not found`,
      });
    }

    const bookingTour = await Booking.create(req.body);

    console.log(user.email, user.fullNames);
    receiveBookingEmail(user.email, user.fullNames);
    res.status(201).json({
      message: `A tour with ID: ${tourID} is successfully booked`,
      data: { bookingTour },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
