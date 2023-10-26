import { Contact } from "../../models";

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete({ _id: id });

    if (!contact) {
      return res.status(404).json({
        message: `A contact with ID: ${id}, not found!`,
      });
    }

    res.status(204).json({
      message: `A contact with ID: ${id}, deleted successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
