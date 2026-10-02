import express from "express";
import cors from "cors";
import listings from "./routes/listings.route";
import bookings from "./routes/bookings.route";
import admin from "./routes/admin.route";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import { stripeWebhook } from "./controllers/stripe.controller";

export const app = express();
app.post(
  "/api/v1/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);
// several origins are legitimate: the apex, the www alias, and the vercel
// preview URL. anything else is refused.
const allowedOrigins = (process.env.CLIENT_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // server-to-server calls and curl send no origin
      if (!origin || allowedOrigins.includes(origin))
        return callback(null, true);
      return callback(new Error(`origin not allowed: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/v1", listings);
app.use("/api/v1", bookings);
app.use("/api/v1", admin);

app.use(errorHandler);
