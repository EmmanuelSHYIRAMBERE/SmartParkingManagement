import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  replying: {
    type: String,
    required: true,
  },
});

export const Contact = mongoose.model("Contact", contactSchema);
