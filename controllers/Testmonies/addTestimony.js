import { Testimony } from "../../models";
import { User } from "../../models";

export const addTestimony = async (req, res) => {
  try {
    const userID = req.body.userID;
    const user = await User.findByID({ _id: userID });
    if (!user) {
      return res.status.json({
        message: `A user with ID: ${userID} is not found`,
      });
    }

    const testimony = await Testimony.create(req.body);
    res.status(201).json({
      message: "testimony added successfully",
      data: { testimony },
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
