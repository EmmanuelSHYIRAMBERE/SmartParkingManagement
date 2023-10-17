import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    emails: {
        type: String,
        required: true
    },
    replying: {
        type: String,
        required: true
    }
});

export const Contact = mongoose.model("Contact", contactSchema);