import { Booking } from "../../models";

export const getBooking = async (req, res) => {
    try {
        const {id} = req.params
     
        const booking = await Booking.findOne({_id:id})

        if (!booking) {
            return res.status(404).json({
                message: `A booking with ID: ${id}, not found!`,
            })
        }

        res.status(200).json({booking})
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
        
    }
    
}