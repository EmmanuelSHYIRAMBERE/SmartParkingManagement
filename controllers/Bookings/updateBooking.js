import { Booking } from "../../models";

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndUpdate({ _id: id }, req.body);

    if (!booking) {
      return res.status(404).json({
        message: `A  booking with ID: ${id}, not found`,
      });
    }

    const updatedBooking = await Booking.findById(id);
    res.status(200).json({
      message: `A booking with ID: ${id}, updated successfully to;`,
      updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
