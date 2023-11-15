import express from "express";

const bookingsRouter = express.Router();

import {
  bookTour,
  getBookings,
  deleteBooking,
  updateBooking,
  getBooking,
  modifyBooking,
  getCheckOutSession,
} from "../controllers/Bookings";
import { admin, paginatedResults, verifyToken } from "../middleware";
import { Booking } from "../models";

bookingsRouter.get("/getbooking/:id", verifyToken, admin, getBooking);

bookingsRouter.get(
  "/getbookings",
  verifyToken,
  admin,
  paginatedResults(Booking),
  getBookings
);

bookingsRouter.post("/booktour", verifyToken, bookTour);

bookingsRouter.delete("/deletebooking/:id", verifyToken, deleteBooking);

bookingsRouter.put("/updatebooking/:id", verifyToken, updateBooking);

bookingsRouter.patch("/modifybooking/:id", verifyToken, admin, modifyBooking);

bookingsRouter.get("/checkout/:id", verifyToken, admin, getCheckOutSession);

export default bookingsRouter;
