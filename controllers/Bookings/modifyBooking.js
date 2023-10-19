import { Booking } from "../../models";

export const modifyBooking = async (req, res) => {
    try {
        const {id} = req.params

        const booking = await Booking.findOneAndReplace({_id:id}, req.body)

        if (!booking) {
            return res.status(404).json({
                messsage: `A booking with ID: ${id}, not found!`
            })
        }

        const modifiedBooking = await Booking.findById(id)
        res.status(200).json({
            messsage: `A booking with ID: ${id}, modified successfully to;`,
            modifiedBooking,
        })
        
    } catch (error) {
        res.status(500).json({
            messsage: error.messsage,
        })
        
    }    
}