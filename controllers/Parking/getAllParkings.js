import { Parkings } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const getTotalParking = catchAsyncError(async (req, res, next) => {
  const availableParkingSlots = await Parkings.find({});

  if (!availableParkingSlots) {
    return next(new errorHandler(`No any parking slot found!`, 404));
  }

  res.status(200).json(availableParkingSlots);
});

// export const getTours = (req, res) => {
//   res.status(200).json(res.paginatedResults);
// };
