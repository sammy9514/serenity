import { Router } from "express";
import {
  createBooking,
  getByReference,
  quote,
} from "../controllers/bookings.controller";

const router = Router();
router.route("/bookings/quote").post(quote);
router.route("/bookings").post(createBooking);
router.route("/bookings/:reference").get(getByReference);

export default router;
