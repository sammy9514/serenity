import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "../utils/db";
import { Listing } from "../models/listings.model";
import { uploadImage } from "../utils/cloudinary";

// usage: tsx src/jobs/uploadPhotos.ts <slug> <caption>|<room>|<file> ...
const [, , slug, ...specs] = process.argv;

if (!slug || specs.length === 0) {
  console.error(
    "usage: tsx src/jobs/uploadPhotos.ts <slug> '<caption>|<room>|<file>' ...",
  );
  process.exit(1);
}

await connectDb();

const listing = await Listing.findOne({ slug });
if (!listing) throw new Error(`no listing with slug ${slug}`);

// photos seeded without a file leave empty frames on the page
const emptied = listing.photos.filter((photo) => !photo.url).length;
listing.photos = listing.photos.filter((photo) => photo.url) as typeof listing.photos;

const { readFile } = await import("node:fs/promises");

for (const spec of specs) {
  const [caption, room, file] = spec.split("|");
  if (!caption || !room || !file) throw new Error(`bad spec: ${spec}`);

  const buffer = await readFile(file.replace("~", process.env.HOME ?? ""));
  const { url, publicId } = await uploadImage(buffer, `serenity/${slug}`);
  listing.photos.push({ url, publicId, caption, room });
  console.log("uploaded", caption);
}

await listing.save();
console.log(
  `${slug}: removed ${emptied} empty, now ${listing.photos.length} photos`,
);
await mongoose.disconnect();
