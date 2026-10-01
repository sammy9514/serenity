import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "../utils/db";
import { expireStaleRequests } from "../services/booking.service";

await connectDb();
const expired = await expireStaleRequests();
console.log(`expired ${expired} request(s)`);
await mongoose.disconnect();
