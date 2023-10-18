import { Testimony } from "../../models";

export const deleteTestimony = async (req, res) => {
    try {
        const {id} = req.params
    
        const testimony = await Testimony.findByIdAndDelete({_id:id})

        if (!testimony) {
            return res.status(404).json({
                message:`A testimony with ID: ${id}, not found!`,
            })
        }
        
        res.status(200).json({
            message: `A testimony with ID: ${id}, deleted successfully!`,
        });
        
    } catch (error) {
        res.status(500).json({
        message:error.message,
    })

    }
    
}