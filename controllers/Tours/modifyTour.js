import { Tours } from "../../models";

export const modifyTour = async (req, res) => {
    try {
        const {id} = req.params

        const tour = await Tours.findOneAndReplace({_id:id}, req.body)

        if (!tour) {
            return res.status(404).json({
                messsage: `A tour with ID: ${id}, not found!`
            })
        }

        const modifiedTour = await Tours.findById(id)
        res.status(200).json({
            messsage: `A tour with ID: ${id}, modified successfully to;`,
            modifiedTour,
        })
        
    } catch (error) {
        res.status(500).json({
            messsage: error.messsage,
        })
        
    }    
}