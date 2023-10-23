import { User } from "../models";

export const admin = async (req, res, next) => {
  try {
    const { UserId } = req;
    const user = await User.findById(UserId);
    if (user?.role !== "admin") {
      return res.status(403).json({
        message: "Access denied for basic users!",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
