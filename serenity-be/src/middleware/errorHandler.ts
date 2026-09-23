import type { ErrorRequestHandler } from "express";
import { BookingError } from "../services/booking.service";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof BookingError) {
    const status = err.code === "CONFLICT" ? 409 : 400;
    return res
      .status(status)
      .json({ error: { code: err.code, message: err.message } });
  }
  console.error(err);
  return res
    .status(500)
    .json({ error: { code: "INTERNAL", message: "Something went wrong " } });
};
