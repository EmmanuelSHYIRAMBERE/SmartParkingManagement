import { handCastError } from "./handDBCastError";

export const globalErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.name === "CastError") err = handCastError(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
