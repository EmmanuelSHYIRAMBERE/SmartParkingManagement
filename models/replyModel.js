import mongoose from "mongoose";

const replyContactSchema = mongoose.Schema({
  contactID: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  replyMessage: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
});

export const replyContact = mongoose.model("replyContact", replyContactSchema);
