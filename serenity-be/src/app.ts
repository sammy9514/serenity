import express from "express";
import cors from "cors";
import listings from "./routes/listings.route";
import bookings from "./routes/bookings.route";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/v1", listings);
app.use("/api/v1", bookings);
app.use(errorHandler);
