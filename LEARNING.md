# Learning log

One entry per concept, three lines each: what it is, why it exists, what breaks without it.
Written the same day, in my own words. Entries marked (fill in) are still mine to write.

## Frontend

### Design tokens (@theme)
Used to keep styling (Tailwind tokens) consistent and easy to change when needed, instead of
changing it across every single page. The token also names the intent (bg-ink = "brand dark").
Breaks without it: a colour typed as hex in 40 places; one client request becomes a find-and-replace.

### Container pattern (mx-auto max-w-page px-6)
(fill in) What it does on a wide screen vs a phone. Why 90% width was the wrong tool.

### Full-bleed background, contained content
(fill in) Outer element carries the background, inner container limits the content. Why px-27 drifted.

### Headings are an outline, not a font size
(fill in) One h1 per page. Why the wordmark is a span in a link.

### Server state vs client state (TanStack Query)
(fill in) queryKey, the three states (pending / error / data), why fetch does not throw on 404.

### Data-driven components
(fill in) Map over an array of objects, key on id. Why hard-coded copies are the thing the old site did.

## Backend

### app.ts vs index.ts
(fill in) Why the app is exported without listening. What supertest needs.

### Validate at the edge
(fill in) Reject bad input before using it. typeof checks, NaN dates, from >= to. 400 vs 404 vs 409 vs 500.

### The response envelope
(fill in) { data } on success, { error: { code, message } } on failure. Why every route must match.

### _id, __v, createdAt
_id is the object id of each document, unique, used with findById. __v is the version key
(only bumps on array changes through save). createdAt comes from timestamps: true.
None of them are written by me.

### seed.ts
Calls its own connectDb() because it is not part of the main program; its job is to populate
the database instead of doing it manually with POST. deleteMany first so it is repeatable.

### Half-open intervals [checkIn, checkOut)
9 to 12 vs 12 to 15 do not overlap because A is checked in for 3 nights (9, 10, 11) and checks
out on the 12th, so B can check in on the 12th. nights = checkOut - checkIn, no +1.
Overlap rule: aStart < bEnd && bStart < aEnd.

### Mongo query operators
(fill in) $lt, $gt, $in, $ne. Why $lt not $lte here. Keys in one object are ANDed.

### Indexes
(fill in) What { listing: 1, checkIn: 1 } does, when it helps, what it costs.

### Snapshot on booking
Storing total on the booking ensures there is no problem between the guest and the client:
a later price change must not affect an already booked apartment. Anything financial: snapshot it.

### Service vs controller
The shared code lives in a separate file (a service); each controller calls that function
instead of doing it twice. Controllers stay thin: parse, call, respond. Rules and tests live in the service.

### Typed errors (BookingError)
(fill in) A service throws a code + message; the error handler maps the code to an HTTP status.
Why the specific check comes before the generic 500.

### Race condition: insert-then-check
Check-then-insert lets two users who book at the same time coexist with the same apartment.
Insert-then-check places the booking first, then checks for any earlier overlapping booking
(smaller _id wins); the loser deletes itself and returns 409.

### findConflicts
(fill in) The one query that defines "these dates are taken". Why availability and quote share it.

## Habits
- Read the first line of the error before asking.
- Comment-plan first when frozen, then fill one comment at a time.
- Before commit: tsc, tests, curls. The curl output is the proof.
- Conventional commits: type(scope): summary.
