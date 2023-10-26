import { Contact } from "../../models";

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndUpdate({ _id: id }, req.body);

    if (!contact) {
      return res.status(404).json({
        message: `The contact with ID: ${id} not found`,
      });
    }

    const updatedContact = await Contact.findById(id);

    res.status(200).json({
      message: `The current contact with ID: ${id} was successfully updated`,
      updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
