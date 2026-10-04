import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { connectDb } from "../utils/db";
// configures the shared client from the env vars
import "../utils/cloudinary";
import { Listing } from "../models/listings.model";

const [, , filePath, slug] = process.argv;

if (!filePath || !slug) {
  console.error("usage: tsx src/jobs/uploadTour.ts <file> <listing-slug>");
  process.exit(1);
}

await connectDb();

// chunked upload: a single POST of a large video is fragile on slow links.
// upload_large is callback-based, so it needs wrapping to be awaited.
const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
  cloudinary.uploader.upload_large(
    filePath,
    {
      resource_type: "video",
      folder: `serenity/${slug}`,
      chunk_size: 6_000_000,
    },
    (error, uploaded) => {
      if (error || !uploaded) return reject(error ?? new Error("no result"));
      resolve(uploaded as { secure_url: string });
    },
  );
});

const updated = await Listing.updateOne(
  { slug },
  { $set: { tourVideoUrl: result.secure_url } },
);

console.log("uploaded:", result.secure_url);
console.log(`${slug}: modified ${updated.modifiedCount}`);

await mongoose.disconnect();
