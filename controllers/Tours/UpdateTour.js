import { Tours } from "../../models";

export const updateTour = async (req, res) => {
    try {
        const {id} =req.params

        const tour = await Tours.findByIdAndUpdate({_id:id}, req.body)

        if (!tour) {
            return res.status(404).json({
                message: `A  tour with ID: ${id}, not found`,
            })
        }

        const updatedTour = await Tours.findById(id)
        res.status(200).json({
            message: `A tour with ID: ${id}, updated successfully to;`,
            updatedTour,
        })
            
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
        
    }
        
}