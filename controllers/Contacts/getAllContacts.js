import { Contact } from "../../models";

export const getContacts = async (req, res) => {
    try {
        const contact =await Contact.find({})

        if (!contact) {
            return res.status(404).json({
                message: "Nothing found in database"
            })
        }

        res.status(200).json(contact)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }
}