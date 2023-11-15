import mongoose from "mongoose";

const parkingSchema = mongoose.Schema({
  parkingNo: {
    type: String,
    required: true,
  },
  Amount: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
  availabilty: {
    type: String,
    default: "available",
  },
});

export const Parkings = mongoose.model("Parkings", parkingSchema);
