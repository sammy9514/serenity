import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { fetchListings } from "../api/listings";
import { useState } from "react";
import {
  approveBooking,
  declineBooking,
  fetchAdminBookings,
} from "../api/admin";
import Button from "../components/Button";
import type { AdminBooking as Booking } from "../types";

const filters = [
  { value: "requested", label: "Requested" },
  { value: "confirmed", label: "Confirmed" },
  { value: "declined", label: "Declined" },
  { value: "", label: "All" },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const statusStyles: Record<Booking["status"], string> = {
  requested: "bg-taupe text-ink",
  confirmed: "bg-ink text-cream",
  declined: "border border-line text-ink/60",
  expired: "border border-line text-ink/60",
  cancelled: "border border-line text-ink/60",
};

const AdminBooking = () => {
  const [status, setStatus] = useState("requested");
  const queryClient = useQueryClient();

  const { data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });

  const {
    data: bookings,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["adminBookings", status],
    queryFn: () => fetchAdminBookings(status),
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["adminBookings"] });

  const { mutate: approve, isPending: isApproving } = useMutation({
    mutationFn: approveBooking,
    onSuccess: invalidate,
  });

  const { mutate: decline, isPending: isDeclining } = useMutation({
    mutationFn: declineBooking,
    onSuccess: invalidate,
  });

  const busy = isApproving || isDeclining;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h1 className="font-display text-2xl">Bookings</h1>
            <p className="text-xs uppercase tracking-widest text-ink/60">
              Serenity Space · host
            </p>
          </div>

          <nav className="flex flex-wrap gap-2">
            {listings?.map((listing) => (
              <Link
                key={listing.slug}
                to={`/admin/listings/${listing.slug}/photos`}
                className="border border-line px-3 py-2 text-xs font-bold uppercase tracking-widest hover:bg-taupe/40"
              >
                {listing.name} photos
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.label}
              variant={filter.value === status ? "primary" : "secondary"}
              onClick={() => setStatus(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {isPending && <p className="mt-8 text-sm text-ink/70">Loading…</p>}
        {isError && (
          <p className="mt-8 text-sm text-red-700">Couldn't load bookings.</p>
        )}

        {bookings && bookings.length === 0 && (
          <p className="mt-8 text-sm text-ink/70">
            No bookings with this status.
          </p>
        )}

        <ul className="mt-6 flex flex-col gap-4">
          {bookings?.map((booking) => (
            <li
              key={booking._id}
              className="border border-line bg-white p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink/60">
                    {booking.reference} · {booking.listing.name}
                  </p>
                  <p className="mt-1 font-display text-xl">
                    {booking.guest.name}
                  </p>
                  <p className="text-sm text-ink/70">{booking.guest.email}</p>
                </div>
                <span
                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${statusStyles[booking.status]}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-4 text-sm">
                <span>
                  {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
                </span>
                <span>{booking.nights} nights</span>
                <span>{booking.guests} guests</span>
                <span className="font-bold">£{booking.total}</span>
              </div>

              {booking.status === "requested" && (
                <div className="mt-4 flex gap-3">
                  <Button onClick={() => approve(booking._id)} disabled={busy}>
                    Approve
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => decline(booking._id)}
                    disabled={busy}
                  >
                    Decline
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminBooking;
