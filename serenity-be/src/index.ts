import "dotenv/config";
import { app } from "./app";
import cron from "node-cron";
import { connectDb } from "./utils/db";
import { expireStaleRequests } from "./services/booking.service";

const port = Number(process.env.PORT ?? 4400);

await connectDb();
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// release the card hold and tell the guest when a request is never answered
cron.schedule("*/10 * * * *", () => {
  void expireStaleRequests();
});
