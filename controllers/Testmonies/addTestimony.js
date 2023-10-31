import { Testimony } from "../../models";
import { User } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const addTestimony = catchAsyncError(async (req, res, next) => {
  const userID = req.body.userID;
  const user = await User.findByID({ _id: userID });
  if (!user) {
    return next(
      new errorHandler(`A user with ID: ${userID} is not found`, 404)
    );
  }

  const testimony = await Testimony.create(req.body);
  res.status(201).json({
    message: "testimony added successfully",
    data: { testimony },
  });
});
