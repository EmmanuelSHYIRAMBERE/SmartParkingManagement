import { User } from "../../models";
import { catchAsyncError, getToken } from "../../utility";
import { sendEmail } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new errorHandler(`We could not find the user with email: ${email}`, 404)
    );
  }

  const resetToken = getToken({ _id: user._id });

  // await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/changepassword/forgotpassword/${resetToken}`;

  const message = `Click the link below to reset your password\n\n${resetUrl}\n\nThis rest password link will be valid for only 10 minutes`;
  await sendEmail({
    email: user.email,
    subject: "Password reset request received",
    message: message,
  });
  res.status(200).json({
    status: "success",
    message: "Password change request received",
  });
});
