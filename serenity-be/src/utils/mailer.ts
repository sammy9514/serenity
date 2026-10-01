import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;
if (!key) throw new Error("resend key is required");
export const mailer = new Resend(key);
