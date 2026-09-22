import { Router } from "express";
import { createBooking, quote } from "../controllers/bookings.controller";

const router = Router();
router.route("/bookings/quote").post(quote);
router.route("/bookings").post(createBooking);

export default router;
