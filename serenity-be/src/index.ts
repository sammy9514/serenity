import "dotenv/config";
import { app } from "./app";
import { connectDb } from "./utils/db";

const port = Number(process.env.PORT ?? 4400);

await connectDb();
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
