import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type React from "react";
import { Link, useParams } from "react-router";
import { LuChevronLeft, LuStar, LuTrash2 } from "react-icons/lu";
import { fetchListing } from "../api/listings";
import {
  deletePhoto,
  makeCoverPhoto,
  uploadPhoto,
  uploadTourVideo,
} from "../api/admin";
import Button from "../components/Button";

const rooms = [
  "Living room",
  "Master bedroom",
  "Second bedroom",
  "Kitchen",
  "Bathrooms",
  "Garden",
  "Other",
];

const AdminPhotos = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [room, setRoom] = useState(rooms[0]!);

  const {
    data: listing,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["listing", slug],
    queryFn: () => fetchListing(slug!),
  });

  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: ["listing", slug] });

  const upload = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: () => {
      setFile(null);
      setCaption("");
      refresh();
    },
  });

  const remove = useMutation({ mutationFn: deletePhoto, onSuccess: refresh });

  const tour = useMutation({
    mutationFn: uploadTourVideo,
    onSuccess: () => {
      setVideo(null);
      refresh();
    },
  });

  const setCover = useMutation({
    mutationFn: makeCoverPhoto,
    onSuccess: refresh,
  });

  const busy = remove.isPending || setCover.isPending;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !slug) return;
    upload.mutate({ slug, file, caption, room });
  };

  if (isPending) return <p className="p-6">Loading…</p>;
  if (isError) return <p className="p-6">Couldn't load this apartment.</p>;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-5 sm:px-6">
          <Link
            to="/admin"
            aria-label="Back to bookings"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
          >
            <LuChevronLeft />
          </Link>
          <div>
            <h1 className="font-display text-2xl">Photos</h1>
            <p className="text-xs uppercase tracking-widest text-ink/60">
              {listing.name}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 border border-line bg-white p-5"
        >
          <h2 className="font-display text-xl">Add a photo</h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm"
            required
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/70">
                Caption
              </span>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Living room, morning light"
                className="border border-line px-3 py-2 text-sm outline-none focus:border-ink"
                required
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/70">
                Room
              </span>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="border border-line px-3 py-2 text-sm outline-none focus:border-ink"
              >
                {rooms.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {upload.error && (
            <p className="text-sm text-red-700">{upload.error.message}</p>
          )}

          <div className="grid sm:inline-grid sm:justify-start">
            <Button type="submit" disabled={upload.isPending || !file}>
              {upload.isPending ? "Uploading…" : "Upload photo"}
            </Button>
          </div>

          <p className="text-xs text-ink/60">
            JPEG or PNG, up to 5MB. The first photo of each room is used as that
            room's lead image, and the first photo overall is the main one on
            the apartment page.
          </p>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (video && slug) tour.mutate({ slug, file: video });
          }}
          className="mt-6 flex flex-col gap-4 border border-line bg-white p-5"
        >
          <h2 className="font-display text-xl">Virtual tour video</h2>

          {listing.tourVideoUrl && (
            <video
              src={listing.tourVideoUrl}
              controls
              preload="metadata"
              className="aspect-video w-full max-w-md bg-ink"
            />
          )}

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
            className="text-sm"
            required
          />

          {tour.error && (
            <p className="text-sm text-red-700">{tour.error.message}</p>
          )}

          <div className="grid sm:inline-grid sm:justify-start">
            <Button type="submit" disabled={tour.isPending || !video}>
              {tour.isPending
                ? "Uploading…"
                : listing.tourVideoUrl
                  ? "Replace video"
                  : "Upload video"}
            </Button>
          </div>

          <p className="text-xs text-ink/60">
            MP4 or MOV, up to 100MB. Uploading replaces the current tour.
          </p>
        </form>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl">
            {listing.photos.length} photos
          </h2>
          <p className="text-sm text-ink/70">
            The first photo is used across the site. Use the star to promote
            one.
          </p>
        </div>

        {(remove.error || setCover.error) && (
          <p className="mt-3 text-sm text-red-700">
            {(remove.error ?? setCover.error)?.message}
          </p>
        )}

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {listing.photos.map((photo, index) => (
            <figure key={photo._id} className="border border-line bg-white">
              <img
                src={photo.url}
                alt={photo.caption}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="flex items-start justify-between gap-2 p-3">
                <span className="text-sm">
                  {photo.caption}
                  <span className="block text-xs text-ink/60">
                    {index === 0 ? "Cover photo · " : ""}
                    {photo.room}
                  </span>
                </span>
                <span className="flex shrink-0 gap-3">
                  {index !== 0 && (
                    <button
                      type="button"
                      aria-label={`Make ${photo.caption} the cover photo`}
                      disabled={busy}
                      onClick={() => {
                        if (slug) setCover.mutate({ slug, photoId: photo._id });
                      }}
                      className="text-ink/60 hover:text-ink disabled:opacity-40"
                    >
                      <LuStar />
                    </button>
                  )}
                  <button
                    type="button"
                    aria-label={`Delete ${photo.caption}`}
                    disabled={busy}
                    onClick={() => {
                      if (!slug) return;
                      if (confirm(`Delete "${photo.caption}"?`))
                        remove.mutate({ slug, photoId: photo._id });
                    }}
                    className="text-ink/60 hover:text-red-700 disabled:opacity-40"
                  >
                    <LuTrash2 />
                  </button>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPhotos;
