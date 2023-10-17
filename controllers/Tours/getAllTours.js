import { Tours } from "../../models";

export const getTours = async (req, res) => {
    try {
        const tours =await Tours.find({})

        if (!tours) {
            return res.status(404).json({
                message: "Nothing found in database"
            })
        }

        res.status(200).json(tours)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }
}