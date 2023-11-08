import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  names: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  replyMessage: {
    type: Object,
    default: undefined,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
  repliedDate: {
    type: Date,
    default: null,
  },
});

export const Contact = mongoose.model("Contact", contactSchema);
