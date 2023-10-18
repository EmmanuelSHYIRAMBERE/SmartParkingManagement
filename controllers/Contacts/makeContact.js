import { Contact } from "../../models";

export const makeContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body)
        res.status(201).json({
            message: "A contact added successfully",
            data: {contact}
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
        
    }
};
