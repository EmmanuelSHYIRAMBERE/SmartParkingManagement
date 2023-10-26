import { Contact } from "../../models";
import { User } from "../../models";
import { receiveContactEmail } from "../../middleware";

export const makeContact = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "user with this email not found",
      });
    }

    const contact = await Contact.create(req.body);

    console.log(req.body.email);
    receiveContactEmail(req.body.email, user.fullNames);

    res.status(201).json({
      message: "Your feedback received successfully",
      data: { contact },
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
