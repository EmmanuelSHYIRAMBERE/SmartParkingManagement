import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  tourID: {
    type: String,
    required: true,
  },
  isPlayed: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
