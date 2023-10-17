import { User } from "../../models";

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({})

        if (!users) {
            return res.status(404).json({
                message: "Nothing found in database"
            })
        }

        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
        
    }

}