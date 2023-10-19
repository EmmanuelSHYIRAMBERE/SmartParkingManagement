import { User } from "../../models";

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
    
        const user = await User.findByIdAndDelete({_id:id})

        if (!user) {
            return res.status(404).json({
                message:`A user with ID: ${id}, not found!`,
            })
        }
        
        res.status(204).json({
            message: `A user with ID: ${id}, deleted successfully!`,
        });
        
    } catch (error) {
        res.status(500).json({
        message:error.message,
    })

    }
    
}