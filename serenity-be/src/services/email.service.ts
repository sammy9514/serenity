import { mailer } from "../utils/mailer";

type BookingEmail = {
  reference: string;
  accessToken: string;
  guest: { name: string; email: string; phoneNumber?: string };
  checkIn: Date;
  checkOut: Date;
  nights: number;
  total: number;
  listingName: string;
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const row = (label: string, value: string, bold = false) => `
  <tr>
    <td style="padding: 8px 0; border-bottom: 1px solid #c4b3aa;">${bold ? `<strong>${label}</strong>` : label}</td>
    <td style="padding: 8px 0; border-bottom: 1px solid #c4b3aa; text-align: right;">${bold ? `<strong>${value}</strong>` : value}</td>
  </tr>`;

const details = (booking: BookingEmail) => `
  <table style="border-collapse: collapse; width: 100%; margin: 24px 0;">
    ${row("Reference", booking.reference)}
    ${row("Apartment", booking.listingName)}
    ${row("Dates", `${formatDate(booking.checkIn)} to ${formatDate(booking.checkOut)}`)}
    ${row("Nights", String(booking.nights))}
    ${row("Total", `&pound;${booking.total}`, true)}
  </table>`;

const linkBlock = (url: string, label: string) => `
  <p style="margin: 0 0 8px;"><a href="${url}" style="color: #3a3036;">${label}</a></p>
  <p style="margin: 0 0 24px; font-size: 13px; color: #6b625f; word-break: break-all;">${url}</p>`;

const layout = (body: string) => `
  <div style="font-family: Georgia, 'Times New Roman', serif; color: #3a3036; max-width: 560px;">
    ${body}
    <p style="margin: 0; font-size: 13px; color: #6b625f; border-top: 1px solid #c4b3aa; padding-top: 16px;">
      Serenity Space Luxury Homes<br />
      [STREET ADDRESS] &middot; [PHONE]
    </p>
  </div>`;

const send = async (to: string, subject: string, body: string) => {
  try {
    const { error } = await mailer.emails.send({
      from: process.env.MAIL_FROM!,
      to,
      subject,
      html: layout(body),
    });
    if (error) console.error("email failed:", subject, error);
  } catch (err) {
    console.error("email threw:", subject, err);
  }
};

const statusUrl = (booking: BookingEmail) =>
  `${process.env.CLIENT_ORIGIN}/bookings/${booking.reference}?token=${booking.accessToken}`;

export const sendRequestReceived = (booking: BookingEmail) =>
  send(
    booking.guest.email,
    `We have your request · ${booking.reference}`,
    `
      <p style="font-size: 18px; margin: 0 0 16px;">Hello ${booking.guest.name},</p>
      <p style="margin: 0 0 16px; line-height: 1.6;">
        Thank you for your request to stay at ${booking.listingName}. The host
        will confirm within 48 hours.
      </p>
      ${details(booking)}
      <p style="margin: 0 0 16px; line-height: 1.6;">
        Your card has been authorised but <strong>not charged</strong>. Payment is
        taken only when the host confirms. If the dates cannot be confirmed, the
        authorisation is released and you pay nothing.
      </p>
      ${linkBlock(statusUrl(booking), "View your booking")}
    `,
  );

export const sendHostNewRequest = (booking: BookingEmail) =>
  send(
    process.env.HOST_EMAIL!,
    `New request · ${formatDate(booking.checkIn)} · ${booking.reference}`,
    `
      <p style="font-size: 18px; margin: 0 0 16px;">New booking request</p>
      <p style="margin: 0 0 16px; line-height: 1.6;">
        ${booking.guest.name} (${booking.guest.email}${
          booking.guest.phoneNumber ? ` · ${booking.guest.phoneNumber}` : ""
        }) has requested
        ${booking.listingName}. Their card is authorised and waiting for your
        decision. If you do not respond within 48 hours the request expires and
        the authorisation is released.
      </p>
      ${details(booking)}
      ${linkBlock(`${process.env.CLIENT_ORIGIN}/admin`, "Approve or decline")}
    `,
  );

export const sendApproved = (booking: BookingEmail) =>
  send(
    booking.guest.email,
    `Your stay is confirmed · ${booking.reference}`,
    `
      <p style="font-size: 18px; margin: 0 0 16px;">Hello ${booking.guest.name},</p>
      <p style="margin: 0 0 16px; line-height: 1.6;">
        Your stay at ${booking.listingName} is confirmed and your payment of
        <strong>&pound;${booking.total}</strong> has been taken.
      </p>
      ${details(booking)}
      <p style="margin: 0 0 16px; line-height: 1.6;">
        Check-in is from 3:00 pm and checkout is by 11:00 am. We will send the
        lockbox code and parking instructions the day before you arrive.
      </p>
      ${linkBlock(statusUrl(booking), "View your booking")}
    `,
  );

export const sendDeclined = (booking: BookingEmail) =>
  send(
    booking.guest.email,
    `About your request · ${booking.reference}`,
    `
      <p style="font-size: 18px; margin: 0 0 16px;">Hello ${booking.guest.name},</p>
      <p style="margin: 0 0 16px; line-height: 1.6;">
        We are sorry, we cannot confirm ${booking.listingName} for these dates.
        The authorisation on your card has been released and
        <strong>you have not been charged</strong>.
      </p>
      ${details(booking)}
      <p style="margin: 0 0 16px; line-height: 1.6;">
        If your plans are flexible, other dates may be available.
      </p>
      ${linkBlock(`${process.env.CLIENT_ORIGIN}`, "See availability")}
    `,
  );

export const sendExpired = (booking: BookingEmail) =>
  send(
    booking.guest.email,
    `About your request · ${booking.reference}`,
    `
      <p style="font-size: 18px; margin: 0 0 16px;">Hello ${booking.guest.name},</p>
      <p style="margin: 0 0 16px; line-height: 1.6;">
        We were not able to confirm these dates in time, so your request has
        expired. The authorisation on your card has been released and
        <strong>you have not been charged</strong>.
      </p>
      ${details(booking)}
      <p style="margin: 0 0 16px; line-height: 1.6;">
        If your dates are still free, you are welcome to request them again.
      </p>
      ${linkBlock(`${process.env.CLIENT_ORIGIN}`, "See availability")}
    `,
  );
