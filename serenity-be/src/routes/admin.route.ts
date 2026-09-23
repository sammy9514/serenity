import { Router, type Request, type Response } from "express";
import { login } from "../controllers/login.controller";
import { requireAdmin } from "../middleware/authHandler";

const router = Router();
const me = (req: Request, res: Response) =>
  res.json({ data: { role: "admin" } });

router.route("/admin/login").post(login);
router.route("/admin/me").get(requireAdmin, me);

export default router;
