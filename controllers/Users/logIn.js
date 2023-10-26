import { User } from "../../models";
import { comparePwd, getToken } from "../../utility";

export const logIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "user with this email not found",
      });
    }

    let isPwdMatch = comparePwd(req.body.password, user.password);

    if (!isPwdMatch) {
      return res.status(401).json({
        message: "wrong password!",
      });
    }

    let token = getToken({ _id: user._id });

    res.status(200).json({
      message: "Authorised!",
      access_token: token,
      user: {
        email: user.email,
        fullNames: user.fullNames,
        location: user.location,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
