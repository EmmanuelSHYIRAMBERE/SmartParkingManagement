import { catchAsyncError, comparePwd, hashPwd } from "../../utility";
import { User } from "../../models";
import errorHandler from "../../utility/errorHandlerClass";

export const changePwd = catchAsyncError(async (req, res, next) => {
  const { password, newPwd } = req.body;

  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return next(new errorHandler(`User not found!`, 404));
  }

  let pwdCheck = await comparePwd(password, user.password);

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
