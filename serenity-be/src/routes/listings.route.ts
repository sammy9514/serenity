import { Router } from "express";
import { getListings } from "../controllers/listings.controller";
import { getAvailability } from "../controllers/listings.controller";

const router = Router();
router.route("/listings").get(getListings);
router.route("/listings/:slug/availability").get(getAvailability);

export default router;
