import express from "express";
import toursRouter from "./availableTours";
import usersRouter from "./accessUsers";
import bookingsRouter from "./Bookings";
import authenticate from "./authentication";
import contactsRouter from "./Contacts";
import testimoniesRouter from "./Testimonies";
import errorHandler from "../utility/errorHandlerClass";
import { globalErrorController } from "../controllers/Errors";

const holidaysRouter = express.Router();

holidaysRouter.use("/tours", toursRouter);
holidaysRouter.use("/users", usersRouter);
holidaysRouter.use("/contacts", contactsRouter);
holidaysRouter.use("/testimonies", testimoniesRouter);
holidaysRouter.use("/bookings", bookingsRouter);
holidaysRouter.use("/changepassword", authenticate);

holidaysRouter.all("*", (req, res, next) => {
  next(new errorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

holidaysRouter.use(globalErrorController);

export default holidaysRouter;
