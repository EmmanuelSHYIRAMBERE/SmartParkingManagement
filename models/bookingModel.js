import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  tourID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    default: "Pending",
  },
  NumberOfTicket: {
    type: String,
    required: true,
  },
  isPlayed: {
    type: String,
    default: "false",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
  approvedDate: {
    type: Date,
    default: null,
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
