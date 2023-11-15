import express from "express";
import parkingRouter from "./accessParkings";
import usersRouter from "./accessUsers";
import bookingsRouter from "./Bookings";
import authenticate from "./authentication";
import contactsRouter from "./Contacts";
import testimoniesRouter from "./Testimonies";
import errorHandler from "../utility/errorHandlerClass";
import { globalErrorController } from "../controllers/Errors";
import stripeRoute from "./payRoute";
import packRouter from "./payPack";

const systemRouter = express.Router();

systemRouter.use("/parkings", parkingRouter);
systemRouter.use("/users", usersRouter);
// systemRouter.use("/contacts", contactsRouter);
// systemRouter.use("/testimonies", testimoniesRouter);
// systemRouter.use("/bookings", bookingsRouter);
systemRouter.use("/password", authenticate);
systemRouter.use("/payment", stripeRoute);
systemRouter.use("/momo", packRouter);

systemRouter.all("*", (req, res, next) => {
  next(new errorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

systemRouter.use(globalErrorController);

export default systemRouter;
