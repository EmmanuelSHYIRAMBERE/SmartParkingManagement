import { User } from "../../models";



export const modifyUser = async (req, res) => {
    try {
        const {id} = req.params

        const user = await User.findOneAndReplace({_id:id}, req.body)

        if (!user) {
            return res.status(404).json({
                messsage: `A user with ID: ${id}, not found!`
            })
        }

        // const image = await cloudinary.uploader.upload(req.file.path);

        const modifiedUser = await Tours.findById(id)
        
        res.status(200).json({
            messsage: `A user with ID: ${id}, modified successfully to;`,
            ...req.body,
            // image: image.secure_url,
        })
        
    } catch (error) {
        res.status(500).json({
            messsage: error.messsage,
        })
        
    }    
}