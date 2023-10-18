import { Testimony } from "../../models";

export const addTestimony = async (req, res) => {
    try {
        const testimony = await Testimony.create(req.body)
        res.status(201).json({
            message: "testimony added successfully",
            data: {testimony}
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
        
    }
};