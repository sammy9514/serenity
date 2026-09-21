import { Router } from "express";
import { quote } from "../controllers/bookings.controller";

const router = Router();
router.route("/bookings/quote").post(quote);

export default router;
