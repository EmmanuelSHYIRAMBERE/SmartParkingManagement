import { comparePwd, hashPwd } from "../../utility";
import { User } from "../../models";

export const changePwd = async (req, res) => {
  try {
    const { existingPwd, newPwd } = req.body;

    const { UserId } = req;

    const user = await User.findById(UserId);

    let pwdCheck = await comparePwd(existingPwd, user.password);

    if (!pwdCheck) {
      return res.status(401).json({
        message: "wrong email or password credentials!",
      });
    }

    let hashedPwd = await hashPwd(newPwd);

    user.password = hashedPwd;

    user.save();

    res.status(200).json({
      message: "password changed succesfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
