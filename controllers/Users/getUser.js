import { User } from "../../models";

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        message: `A user with ID: ${id}, not found!`,
      });
      // } //else if (user._id !== id) {
      //     console.log("id:", id.id);
      //     console.log("UserId", user._id);
      //     res.status(401).json({
      //         message: `you don't have access to the external data!`
      //     })
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
