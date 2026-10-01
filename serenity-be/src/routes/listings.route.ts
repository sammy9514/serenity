import { Router } from "express";
import { getListing, getListings } from "../controllers/listings.controller";
import { getAvailability } from "../controllers/listings.controller";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();
router.route("/listings").get(getListings);
router.route("/listings/:slug/availability").get(getAvailability);
router.route("/listings/:slug").get(getListing);
router.route("/admin/listings/:slug/photos").post(requireAdmin);

export default router;
