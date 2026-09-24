import { Router, type Request, type Response } from "express";
import { login } from "../controllers/login.controller";
import { requireAdmin } from "../middleware/requireAdmin";
import { approve, decline } from "../controllers/bookings.controller";

const router = Router();
const me = (req: Request, res: Response) =>
  res.json({ data: { role: "admin" } });

router.route("/admin/login").post(login);
router.route("/admin/me").get(requireAdmin, me);
router.route("/admin/bookings/:id/approve").patch(requireAdmin, approve);
router.route("/admin/bookings/:id/decline").patch(requireAdmin, decline);

export default router;
