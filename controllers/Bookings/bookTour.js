import { Booking } from "../../models";

export const bookTour = async (req, res) => {
    try{
        const bookingTour = await Booking.create(req.body)
        res.status(201).json(bookingTour)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}