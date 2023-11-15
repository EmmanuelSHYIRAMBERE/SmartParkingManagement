import { User } from "../../models";
import { comparePwd, getToken } from "../../utility";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const logIn = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new errorHandler(`user with this email not found, try others`, 404)
    );
  }

  let isPwdMatch = await comparePwd(req.body.password, user.password);

  if (!isPwdMatch) {
    return next(new errorHandler(`wrong password!`, 401));
  }

  let token = getToken({ _id: user._id, email: user.email });

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
});
