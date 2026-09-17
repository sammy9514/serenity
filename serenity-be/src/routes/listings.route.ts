import { Router } from "express";
import { getListings } from "../controllers/listings.controller";

const router = Router();
router.route("/listings").get(getListings);

export default router;
