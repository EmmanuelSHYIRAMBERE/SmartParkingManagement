import { User } from "../../models";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2;

cloudinary.config ({
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_key, 
});

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