import { Testimony } from "../../models";

export const updateTestimony = async (req, res) => {
    try {
        const {id} =req.params

        const testimony = await Testimony.findByIdAndUpdate({_id:id}, req.body)

        if (!testimony) {
            return res.status(404).json({
                message: `A  testimony with ID: ${id}, not found`,
            })
        }

        const updatedTestimony = await Testimony.findById(id)
        res.status(200).json({
            message: `A testimony with ID: ${id}, updated successfully to;`,
            updatedTestimony,
        })
            
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
        
    }
        
}