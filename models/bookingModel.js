import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  parkingID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  plateNo: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    default: "pending",
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
