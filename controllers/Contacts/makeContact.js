import { Contact } from "../../models";
import { User } from "../../models";

export const makeContact = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "user with this email not found",
      });
    }

    const contact = await Contact.create(req.body);
    res.status(201).json({
      message: "A contact added successfully",
      data: { contact },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
