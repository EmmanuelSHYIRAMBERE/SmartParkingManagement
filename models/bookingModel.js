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
  payableAmount: {
    type: String,
    required: false,
  },
  Status: {
    type: String,
    default: "pending",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: false,
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

export const Reservations = mongoose.model("Reservations", bookingSchema);
