import { Parkings } from "../../models/parkingModel.js";
import { catchAsyncError } from "../../utility/catchSync.js";

export const addNewParking = catchAsyncError(async (req, res, next) => {
  const newParkingSlot = await Parkings.create(req.body);
  return res.status(201).json({
    status: "A parking slot added successfully",
    data: { newParkingSlot },
  });
});
