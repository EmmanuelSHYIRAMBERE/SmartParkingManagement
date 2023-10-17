import express from "express"; 

const bookingsRouter = express.Router()

import { bookTour } from "../controllers/Bookings";


bookingsRouter.post("/booktour", bookTour)



export default bookingsRouter

