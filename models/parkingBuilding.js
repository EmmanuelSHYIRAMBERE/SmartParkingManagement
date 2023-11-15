import mongoose from "mongoose";

const buildingSchema = mongoose.Schema({
  buildingName: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  totalSlots: {
    type: Number,
    required: false,
  },
  availableSlots: {
    type: Number,
    required: false,
  },
  bookedSlots: {
    type: Number,
    required: false,
  },
});

export const Building = mongoose.model("Building", buildingSchema);
