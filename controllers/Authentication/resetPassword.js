import { User } from "../../models";
import { getToken } from "../../utility";
import { sendEmail } from "../../utility";

export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      message: `We could not find the user with email: ${email}`,
    });
  }

  const resetToken = getToken({ _id: user._id });

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/changepassword/forgotpassword/${resetToken}`;

  const message = `Click the link below to reset your password\n\n${resetUrl}\n\nThis rest password link will be valid for only 10 minutes`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset request received",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "Password change request received",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "There was an error sending password reset email, Please try again",
    });
  }
};
