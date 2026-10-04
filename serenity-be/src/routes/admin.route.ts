import { Router, type Request, type Response } from "express";
import multer from "multer";
import {
  addPhoto,
  deletePhoto,
  makeCoverPhoto,
  setTourVideo,
} from "../controllers/photos.controller";
import { login } from "../controllers/login.controller";
import { requireAdmin } from "../middleware/requireAdmin";
import { approve, decline } from "../controllers/bookings.controller";
import { getBookings } from "../controllers/bookings.controller";

const router = Router();

// photos pass straight through to Cloudinary, so keep them in memory, not on
// Render's disk, which is wiped on every restart
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// a walkthrough video is much larger than a photo
const uploadVideoFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});
const me = (req: Request, res: Response) =>
  res.json({ data: { role: "admin" } });

router.route("/admin/login").post(login);
router.route("/admin/me").get(requireAdmin, me);
router.route("/admin/bookings/:id/approve").patch(requireAdmin, approve);
router.route("/admin/bookings/:id/decline").patch(requireAdmin, decline);
router.route("/admin/bookings").get(requireAdmin, getBookings);

router
  .route("/admin/listings/:slug/photos")
  .post(requireAdmin, upload.single("photo"), addPhoto);

router
  .route("/admin/listings/:slug/photos/:photoId")
  .delete(requireAdmin, deletePhoto);

router
  .route("/admin/listings/:slug/photos/:photoId/cover")
  .patch(requireAdmin, makeCoverPhoto);

router
  .route("/admin/listings/:slug/tour")
  .post(requireAdmin, uploadVideoFile.single("video"), setTourVideo);

export default router;
