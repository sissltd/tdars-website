"use client";

import { useState } from "react";

import { Button } from "./Button";
import { ChevronDownIcon, SuccessBurstIcon } from "@/components/site/icons";
import {
  COUNTRY_DIAL_CODES,
  DEFAULT_COUNTRY,
  dialCodeFor,
} from "@/data/countryDialCodes";
import { toInternationalPhone } from "@/lib/support";

/*
  The footer's Contact Us form, wired to POST /api/v1/support/ through our own
  route (`app/api/support/route.ts`) — see that file for why it is proxied.

  Split out of `Footer.tsx` because the footer is a server component and this
  needs state. The markup and classes are unchanged from the version that lived
  there; what is new is the submission, the country dialling code, and the
  sent / failed states.

  ⚠️ The frame has NO success or error state for this form (unlike Request
  access, which has both). The sent panel below reuses Request access's success
  mark and wording shape so the two read as one product; Yemi to confirm.
*/

const fieldClass =
  "h-11 w-full rounded-md bg-surface-subtle px-3 text-sm text-heading placeholder:text-muted";

const labelClass = "mb-1.5 block text-sm font-medium text-footer-foreground";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-accent">
      {" "}
      *
    </span>
  );
}

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
    ⚠️ First Name and Last Name at EVERY width — the desktop frame drew one
    "Full Name" field, and Kaz replaced it (17/09). The API stores the two
    separately, and a single box invites "Adamu Musa Bello Danjuma", which no
    split can divide correctly. Asking for the two the backend wants is the
    only way the record comes out right.
  */
  const names = { first: firstName.trim(), last: lastName.trim() };

  const complete =
    names.first !== "" &&
    names.last !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    message.trim() !== "";

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return; // a second click would file a second message
    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: names.first,
          last_name: names.last,
          email: email.trim(),
          // "NG" + "08012345678" → "+2348012345678". See `toInternationalPhone`.
          phone: toInternationalPhone(country, phone),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        // Only the success path shows the confirmation. Telling someone their
        // message was sent when it was not leaves them waiting for a reply that
        // was never going to come.
        setError(
          response.status === 429
            ? "Too many messages from this network. Please try again shortly."
            : response.status === 400
              ? "Please check your details and try again."
              : "We could not send your message just now. Please try again, or email us if it keeps happening.",
        );
        return;
      }

      setSent(true);
    } catch {
      setError("We could not reach our servers. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="mt-8 flex flex-col items-start gap-3 rounded-md bg-surface-subtle p-5">
        <SuccessBurstIcon className="size-10" />
        <p className="font-heading text-lg font-medium text-heading">Message sent</p>
        <p className="text-sm text-body">
          Thank you — our team has your message and will get back to you by email.
        </p>
        <button
          type="button"
          onClick={() => {
            // Name, email and phone are kept: the likeliest reason to write
            // again is a second question from the same person.
            setMessage("");
            setSent(false);
          }}
          className="text-sm font-medium text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
      {/*
        The three identity fields. First/Last sit side by side from `lg` where
        the frame had Full Name beside Email; Email then takes the full width
        below them, rather than being squeezed into a third column.
      */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="footer-first-name" className={labelClass}>
            First Name
            <RequiredMark />
          </label>
          <input
            id="footer-first-name"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            maxLength={150}
            placeholder="Placeholder"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="footer-last-name" className={labelClass}>
            Last Name
            <RequiredMark />
          </label>
          <input
            id="footer-last-name"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            maxLength={150}
            placeholder="Placeholder"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="footer-email" className={labelClass}>
          Email Address
          <RequiredMark />
        </label>
        <input
          id="footer-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          placeholder="Placeholder"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="footer-phone" className={labelClass}>
          Phone Number
          <RequiredMark />
        </label>
        <div className="flex w-full overflow-hidden rounded-md bg-surface-subtle sm:w-2/3">
          <div className="relative flex shrink-0 items-center border-r border-border">
            <select
              id="footer-phone-country"
              name="phoneCountry"
              aria-label="Country dialling code"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-11 appearance-none bg-transparent pr-8 pl-3 text-sm text-heading"
            >
              {/*
                The frame's selector shows an ISO code ("US"), so the options are
                ISO codes — but each carries its dialling code too, because a
                selector that hides the code leaves the reader guessing which
                country "NG" prefixes their number with.

                ⚠️ NO FLAG EMOJI. Windows has no flag glyphs, so Chrome falls
                back to the two regional-indicator LETTERS — "🇳🇬 NG +234" renders
                as "NG NG +234" there. Kaz caught it in the browser.
              */}
              {COUNTRY_DIAL_CODES.map((c) => (
                <option key={`${c.country}-${c.code}`} value={c.country}>
                  {c.country} {c.code}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2 size-4 text-heading" />
          </div>
          <input
            id="footer-phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel-national"
            required
            placeholder="Placeholder"
            className="h-11 w-full bg-transparent px-3 text-sm text-heading placeholder:text-muted"
          />
        </div>
        {/* What will actually be sent, so a dropped leading zero is visible
            rather than a surprise. */}
        <p className="mt-1.5 text-xs text-footer-body" aria-live="polite">
          {phone.trim()
            ? `Sends as ${toInternationalPhone(country, phone)}`
            : `Numbers are sent with ${dialCodeFor(country)}`}
        </p>
      </div>

      <div>
        <label htmlFor="footer-message" className={labelClass}>
          Message
          <RequiredMark />
        </label>
        <textarea
          id="footer-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          placeholder="Enter your message here"
          className="w-full resize-y rounded-md bg-surface-subtle p-3 text-sm text-heading placeholder:text-muted"
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      ) : null}

      {/* Disabled until the form is complete, matching Request access, where the
          frame itself draws Submit in its disabled fill. */}
      <Button type="submit" fullWidth className="mt-2" disabled={!complete || sending}>
        {sending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
