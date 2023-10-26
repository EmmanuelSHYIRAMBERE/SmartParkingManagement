import { getToken, hashPwd } from "../../utility";
import { User } from "../../models";
import { sendEmail } from "../../middleware";

export const signUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(409).json({
        message: "user with this email already exists, try others",
      });
    }

    let hashedPwd = await hashPwd(req.body.password);

    req.body.password = hashedPwd;

    let newUser = await User.create(req.body);

    sendEmail(req.body.email, req.body.fullNames);
    let token = getToken({ _id: newUser._id });

    res.status(201).json({
      message: "user registerd successfully, login to get access token",
    });
  } catch (error) {
    console.log("the error occurs", error);
    res.status(500).json({
      message: error,
    });
  }
};
