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

// a filter narrows by booking status or by payment status, never both
const filters = [
  { label: "Requested", status: "requested" },
  { label: "Confirmed", status: "confirmed" },
  { label: "Declined", status: "declined" },
  { label: "Refunded", paymentStatus: "refunded" },
  { label: "All" },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const faded = "border border-line text-ink/60";

// keyed by whichever label the badge ends up showing, so it holds both
// booking statuses and the one payment status we surface
const badgeStyles: Record<string, string> = {
  requested: "bg-taupe text-ink",
  confirmed: "bg-ink text-cream",
  declined: faded,
  expired: faded,
  cancelled: faded,
  refunded: faded,
};

// a refund is the more useful fact for the host than the cancellation it caused
const badgeFor = (booking: Booking) =>
  booking.paymentStatus === "refunded" ? "refunded" : booking.status;

const AdminBooking = () => {
  const [filter, setFilter] = useState(filters[0]);
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
    queryKey: ["adminBookings", filter.status, filter.paymentStatus],
    queryFn: () =>
      fetchAdminBookings({
        status: filter.status,
        paymentStatus: filter.paymentStatus,
      }),
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
          {filters.map((option) => (
            <Button
              key={option.label}
              variant={option.label === filter.label ? "primary" : "secondary"}
              onClick={() => setFilter(option)}
            >
              {option.label}
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
                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${badgeStyles[badgeFor(booking)] ?? faded}`}
                >
                  {badgeFor(booking)}
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
