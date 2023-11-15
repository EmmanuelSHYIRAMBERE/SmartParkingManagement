import { catchAsyncError, comparePwd, hashPwd } from "../../utility";
import { Admin, User } from "../../models";
import errorHandler from "../../utility/errorHandlerClass";

export const changePwd = catchAsyncError(async (req, res, next) => {
  const { password, newPwd } = req.body;

  const { id } = req.params;

  let user;

  user = await User.findOne({ _id: id });

  if (!user) {
    user = await Admin.findOne({ _id: id });
    if (!user) {
      return next(
        new errorHandler(`user with this ${id} not found, try others`, 404)
      );
    }
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
