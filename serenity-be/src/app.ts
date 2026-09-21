import express from "express";
import cors from "cors";
import listings from "./routes/listings.route";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/v1", listings);
app.use(errorHandler);
