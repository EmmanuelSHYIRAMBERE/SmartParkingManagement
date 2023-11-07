import { Contact } from "../../models";
import { User } from "../../models";
import { receiveContactEmail } from "../../middleware";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const makeContact = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new errorHandler(`user with this email not found`, 404));
  }

  const contact = await Contact.create(req.body);

  receiveContactEmail(req.body.email, user.fullNames);

  res.status(201).json({
    message: "Your feedback received successfully",
    data: { contact },
  });
});
