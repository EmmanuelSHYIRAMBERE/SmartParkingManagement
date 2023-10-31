import { catchAsyncError, comparePwd, hashPwd } from "../../utility";
import { User } from "../../models";
import errorHandler from "../../utility/errorHandlerClass";

export const changePwd = catchAsyncError(async (req, res, next) => {
  const { existingPwd, newPwd } = req.body;

  const { UserId } = req;

  const user = await User.findById(UserId);

  let pwdCheck = await comparePwd(existingPwd, user.password);

  if (!pwdCheck) {
    return next(new errorHandler(`wrong email or password credentials!`, 401));
  }

  let hashedPwd = await hashPwd(newPwd);

  user.password = hashedPwd;

  user.save();

  res.status(200).json({
    message: "password changed succesfully!",
  });
});
