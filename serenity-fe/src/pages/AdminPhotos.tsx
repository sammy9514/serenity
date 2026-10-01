import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type React from "react";
import { Link, useParams } from "react-router";
import { LuChevronLeft, LuTrash2 } from "react-icons/lu";
import { fetchListing } from "../api/listings";
import { deletePhoto, uploadPhoto } from "../api/admin";
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
            room's lead image, and the first photo overall is the main one on the
            apartment page.
          </p>
        </form>

        <h2 className="mt-10 font-display text-xl">
          {listing.photos.length} photos
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {listing.photos.map((photo) => (
            <figure key={photo._id} className="border border-line bg-white">
              <img
                src={photo.url}
                alt={photo.caption}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="flex items-start justify-between gap-2 p-3">
                <span className="text-sm">
                  {photo.caption}
                  <span className="block text-xs text-ink/60">{photo.room}</span>
                </span>
                <button
                  type="button"
                  aria-label={`Delete ${photo.caption}`}
                  disabled={remove.isPending}
                  onClick={() => {
                    if (!slug) return;
                    if (confirm(`Delete "${photo.caption}"?`))
                      remove.mutate({ slug, photoId: photo._id });
                  }}
                  className="text-ink/60 hover:text-red-700"
                >
                  <LuTrash2 />
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPhotos;
