import express from "express"; 

const bookingsRouter = express.Router()

import { bookTour, getBookings, deleteBooking, updateBooking, getBooking, modifyBooking } from "../controllers/Bookings";


bookingsRouter.post("/booktour", bookTour)

bookingsRouter.get("/getbookings", getBookings)

bookingsRouter.get("/getbooking/:id", getBooking)

bookingsRouter.delete("/deletebooking/:id", deleteBooking)

bookingsRouter.patch("/updatebooking/:id", updateBooking)

bookingsRouter.put("/modifybooking/:id", modifyBooking)



export default bookingsRouter

