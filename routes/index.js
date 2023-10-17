import express from "express";
import toursRouter from "./Tours";
import usersRouter from "./Users";
import bookingsRouter from "./Bookings";
import authenticate from "./authentication";

const holidaysRouter = express.Router();


holidaysRouter.use("/tours", toursRouter);
holidaysRouter.use("/users", usersRouter);
holidaysRouter.use("/bookings", bookingsRouter)
holidaysRouter.use("/changepassword", authenticate)





export default holidaysRouter;