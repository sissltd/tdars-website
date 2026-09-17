/*
  The contract for POST /api/v1/support/ — "Submit a contact form", the footer's
  Contact Us form.

  From the endpoint's own OpenAPI schema (api.tdars.org, 17/09/2026):
    required — first_name, last_name, email, phone, message
    maxLength — 150 on each name, 30 on phone
  It is PUBLIC: posting an empty body answers 400 with per-field errors, not
  401, so no token is involved. Verified against the live endpoint.

  Shared by the browser form and our own route handler, so the two cannot drift.

  ⚠️ There is no full-name helper here any more. The footer asked for one "Full
  Name" on desktop and the two names had to be guessed apart by splitting on the
  first space; Kaz replaced that field with First Name + Last Name on 17/09, so
  the form now collects exactly what the API stores. Do not reintroduce the
  split — "Adamu Musa Bello Danjuma" has no correct division.
*/

import { dialCodeFor } from "@/data/countryDialCodes";

export type SupportPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
};

/**
 * Join a dialling code and a locally-written number into one E.164 number.
 *
 *   "NG" + "08012345678"    → "+2348012345678"
 *   "NG" + "0801 234 5678"  → "+2348012345678"
 *   "NG" + "+2348012345678" → "+2348012345678"
 *
 * ⚠️ The LEADING ZERO IS DROPPED. In Nigeria, and in most countries that use a
 * trunk prefix, 0 is a domestic dialling prefix and is not part of the number —
 * "+2340801…" is not a reachable number. Anyone entering their number the way
 * they would write it locally would otherwise produce a number nobody can call.
 *
 * A number already typed with its country code is taken as complete, so pasting
 * "+234…" does not become "+234+234…".
 */
export function toInternationalPhone(country: string, input: string): string {
  const typed = input.trim();
  if (!typed) return "";

  const dial = dialCodeFor(country);

  if (typed.startsWith("+")) return `+${typed.replace(/[^\d]/g, "")}`;

  const digits = typed.replace(/[^\d]/g, "");
  if (!digits) return "";

  // Someone who typed their full number without the plus, e.g. "2348012345678".
  const dialDigits = dial.replace("+", "");
  if (dialDigits && digits.startsWith(dialDigits) && digits.length > dialDigits.length) {
    return `+${digits}`;
  }

  return `${dial}${digits.replace(/^0+/, "")}`;
}

/**
 * Validate a submission against the same contract the API enforces.
 *
 * Runs on the SERVER, in the route handler, for the same reason as
 * `validateRequestAccess`: the form is the only caller today, but a public
 * endpoint behind our own proxy must assume it is not. Returns the field names
 * that failed, so the caller decides the wording.
 */
export function validateSupport(input: unknown): {
  ok: boolean;
  errors: string[];
  payload?: SupportPayload;
} {
  const errors: string[] = [];
  const body = (input ?? {}) as Record<string, unknown>;
  const text = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  const first_name = text("first_name");
  const last_name = text("last_name");
  const email = text("email");
  const phone = text("phone");
  const message = text("message");

  // 150 is the schema's own maxLength on both names.
  if (!first_name || first_name.length > 150) errors.push("first_name");
  if (!last_name || last_name.length > 150) errors.push("last_name");
  // Deliberately loose, as on Request Access: the API is the authority on which
  // addresses it accepts, and an over-strict pattern rejects real ones.
  if (!email || !email.includes("@")) errors.push("email");
  /*
    E.164: a "+" and 8 to 15 digits. The lower bound is 8 rather than the
    standard's theoretical minimum because every country code here is 1-3
    digits, so anything shorter cannot carry a subscriber number. The upper
    bound is the standard's, and is inside the schema's 30-character limit.
  */
  if (!/^\+\d{8,15}$/.test(phone)) errors.push("phone");
  if (!message) errors.push("message");

  if (errors.length > 0) return { ok: false, errors };

  return { ok: true, errors: [], payload: { first_name, last_name, email, phone, message } };
}
