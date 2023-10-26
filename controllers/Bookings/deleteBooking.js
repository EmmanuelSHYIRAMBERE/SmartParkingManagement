import { Booking } from "../../models";

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete({ _id: id });

    if (!booking) {
      return res.status(404).json({
        message: `A booking with ID: ${id}, not found!`,
      });
    }

    res.status(204).json({
      message: `A booking with ID: ${id}, deleted successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
