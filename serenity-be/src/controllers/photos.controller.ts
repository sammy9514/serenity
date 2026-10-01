import type { Request, Response } from "express";
import { Listing } from "../models/listings.model";
import { deleteImage, uploadImage } from "../utils/cloudinary";

export const addPhoto = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { caption, room } = req.body;

  if (typeof slug !== "string" || !req.file)
    return res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: "a photo is required" } });

  const listing = await Listing.findOne({ slug });
  if (!listing)
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "listing not found" } });

  const { url, publicId } = await uploadImage(req.file.buffer, `serenity/${slug}`);

  listing.photos.push({
    url,
    publicId,
    caption: typeof caption === "string" && caption ? caption : "Photo",
    room: typeof room === "string" && room ? room : "Other",
  });
  await listing.save();

  return res.status(201).json({ data: listing.photos.at(-1) });
};

export const deletePhoto = async (req: Request, res: Response) => {
  const { slug, photoId } = req.params;

  if (typeof slug !== "string" || typeof photoId !== "string")
    return res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: "invalid request" } });

  const listing = await Listing.findOne({ slug });
  if (!listing)
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "listing not found" } });

  const photo = listing.photos.id(photoId);
  if (!photo)
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "photo not found" } });

  // remove it from our record first; a leftover file in Cloudinary is harmless,
  // a photo on the site whose file is gone is not
  const { publicId } = photo;
  photo.deleteOne();
  await listing.save();

  if (publicId) {
    try {
      await deleteImage(publicId);
    } catch (err) {
      console.error("cloudinary delete failed", publicId, err);
    }
  }

  return res.json({ data: { ok: true } });
};
