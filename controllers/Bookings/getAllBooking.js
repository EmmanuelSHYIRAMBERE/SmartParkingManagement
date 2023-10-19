import { Booking } from "../../models";

export const getBookings = async (req, res) => {
    try {
        const bookings =await Booking.find({})

        if (!bookings) {
            return res.status(404).json({
                message: "Nothing found in database"
            })
        }

        res.status(200).json(bookings)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}