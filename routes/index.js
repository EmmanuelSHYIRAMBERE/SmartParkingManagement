import express from "express";
import toursRouter from "./availableTours";
import usersRouter from "./accessUsers";
import bookingsRouter from "./Bookings";
import authenticate from "./authentication";
import contactsRouter from "./Contacts";
import testimoniesRouter from "./Testimonies";

const holidaysRouter = express.Router();

holidaysRouter.use("/tours", toursRouter);
holidaysRouter.use("/users", usersRouter);
holidaysRouter.use("/contacts", contactsRouter);
holidaysRouter.use("/testimonies", testimoniesRouter);
holidaysRouter.use("/bookings", bookingsRouter);
holidaysRouter.use("/changepassword", authenticate);

export default holidaysRouter;
