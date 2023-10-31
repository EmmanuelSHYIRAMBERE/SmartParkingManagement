import { getToken, hashPwd } from "../../utility";
import { User } from "../../models";
import { sendEmail } from "../../middleware";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const signUp = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return next(
      new errorHandler(`user with this email already exists, try others`, 409)
    );
  }

  let hashedPwd = await hashPwd(req.body.password);

  req.body.password = hashedPwd;

  let newUser = await User.create(req.body);

  sendEmail(req.body.email, req.body.fullNames);
  let token = getToken({ _id: newUser._id });

  res.status(201).json({
    message: "user registerd successfully, login to get access token",
  });
});
