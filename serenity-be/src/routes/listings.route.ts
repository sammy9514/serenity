import { Router } from "express";
import { getListing, getListings } from "../controllers/listings.controller";
import { getAvailability } from "../controllers/listings.controller";

const router = Router();
router.route("/listings").get(getListings);
router.route("/listings/:slug/availability").get(getAvailability);
router.route("/listings/:slug").get(getListing);

export default router;
