import mongoose from "mongoose";

const tourShema = mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    backDropImage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    groupSize: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    tourType: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
    fromMonth: {
        type: String,
        required: true
    },
    toMonth: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    returntime: {
        type: String,
        required: true
    },
    gallery: {
        type: String,
        required: true
    },
    priceIncluded: {
        type: String,
        required: true
    },
    priceNotIncluded: {
        type: String,
        required: true
    }
});

export const Tours = mongoose.model("Tours", tourShema);

