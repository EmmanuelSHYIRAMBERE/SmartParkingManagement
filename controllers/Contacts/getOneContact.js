import { Contact } from "../../models";

export const getContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({
        message: `A contact with ID: ${id}, not found!`,
      });
    }

    res.status(200).json({ contact });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
