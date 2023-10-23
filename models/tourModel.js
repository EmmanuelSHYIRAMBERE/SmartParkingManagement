import mongoose from "mongoose";

const tourShema = mongoose.Schema({
  destination: {
    type: String,
    required: false,
  },
  backDropImage: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  groupSize: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
  tourType: {
    type: String,
    required: false,
  },
  departure: {
    type: String,
    required: false,
  },
  seats: {
    type: String,
    required: false,
  },
  fromMonth: {
    type: String,
    required: false,
  },
  toMonth: {
    type: String,
    required: false,
  },
  departureTime: {
    type: String,
    required: false,
  },
  returntime: {
    type: String,
    required: false,
  },
  gallery: {
    type: Array,
    required: false,
  },
  priceIncluded: {
    type: String,
    required: false,
  },
  priceNotIncluded: {
    type: String,
    required: false,
  },
});

export const Tours = mongoose.model("Tours", tourShema);
