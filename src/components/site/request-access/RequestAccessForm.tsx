"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/site/Button";
import { cn } from "@/lib/cn";
import {
  ESTIMATED_USERS,
  MODULES,
  ORG_TYPES,
  type Option,
} from "@/lib/requestAccess";
import { CircleCloseIcon, SuccessBurstIcon } from "@/components/site/icons";

/*
  design/site/web/home-web-request-access.png
  design/site/web/home-web-request-access-success-modal.png
  design/site/mobile/home-mobile-request-access.png
  design/site/mobile/home-mobile-request-access-success-modal.png

  Every field in the frame carries a red asterisk, and Submit is drawn in its
  DISABLED state (#EAC4C1 — `primary/30`, the Button's own disabled fill). Both
  together say the button gates on a complete form, so it does.

  On submit the success card replaces the form and, after 1200ms, navigates —
  the delay and the "Instant" transition are specified on the frame itself
  (Interactions → After delay 1200ms → Navigate to). The frame names the target
  "Dashboard", which in this file is the home page: the marketing site has no
  dashboard, and Home is the frame it points at.
*/

/*
  The three option lists now come from `@/lib/requestAccess`, generated from the
  endpoint's own schema.

  ⚠️ They REPLACE the lists this file used to carry, which were placeholders —
  six organisation types inferred from the audiences on Home, and three user
  bands taken from the subscription tiers in the Terms. The API accepts 26 and 8
  respectively, so every one of the old strings would have come back a 400.

  Two things for Yemi/Ben, since the form no longer matches the frame:
    · the frame's "50 - 300" band does not exist upstream; the API's middle band
      is 50 - 200, and the bands no longer line up with the Essential/Business/
      Executive tiers the Terms describe.
    · 26 organisation types is a long native select. It is still the right
      control on mobile, but the frame was drawn against a list of six.
*/

const fieldClass =
  "h-11 w-full rounded-md border border-border bg-surface-subtle px-3 text-sm text-heading outline-none placeholder:text-muted focus:border-primary";

export function RequestAccessForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organisationType, setOrganisationType] = useState("");
  const [userCount, setUserCount] = useState("");
  const [modules, setModules] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const complete =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    organisationType !== "" &&
    userCount !== "" &&
    modules.length > 0 &&
    notes.trim() !== "";

  // The 1200ms auto-navigate from the frame. Cleared on unmount so a viewer who
  // navigates away first is not yanked back.
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => router.push("/"), 1200);
    return () => clearTimeout(timer);
  }, [submitted, router]);

  const toggleModule = (module: string) =>
    setModules((current) =>
      current.includes(module)
        ? current.filter((m) => m !== module)
        : [...current, module],
    );

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return; // a second click would file a second request
    setSending(true);
    setError(null);

    try {
      /*
        Posted to our OWN route, not to the API. The backend is on plain HTTP
        while this site is HTTPS, so a direct call is blocked as mixed content —
        see the note in `app/api/request-access/route.ts`.
      */
      const response = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          org_type: organisationType,
          estimated_users: userCount,
          modules_interested: modules,
          notes: notes.trim(),
        }),
      });

      if (!response.ok) {
        // Only the success path shows the confirmation. Showing it on a failure
        // would leave someone waiting for a reply to a request nobody received.
        setError(
          response.status === 429
            ? "Too many requests from this network. Please try again shortly."
            : "We could not submit your request just now. Please try again, or email us if it keeps happening.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        "We could not reach our servers. Please check your connection and try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Hug 684 · 32px padding · 12px radius · hairline. Full-bleed below `sm`. */}
      <div className="w-full max-w-[684px] rounded-md border-border bg-surface sm:border sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-heading transition-colors hover:text-accent"
        >
          <CircleCloseIcon className="size-5" />
          Close
        </Link>

        {/* 358 x 26 — H3/Semi Bold.
          TODO(review): the frame gives this #1D2939, a blue-tinted near-black
          that is not in the grey ramp (Gray/Gray 1 is #373737). One heading is
          not worth its own token — confirm whether it is intentional. */}
        <h1 className="mt-4 font-heading text-h3 font-semibold text-heading">
          Request access
        </h1>
        <p className="mt-2 text-sm text-body">
          Tell us about your organisation and we&apos;ll get back to you within
          2 business days.
        </p>

        <form className="mt-8" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First Name" htmlFor="first-name">
              <input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Marian"
                autoComplete="given-name"
                className={fieldClass}
              />
            </Field>

            <Field label="Last Name" htmlFor="last-name">
              <input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Adeyemi"
                autoComplete="family-name"
                className={fieldClass}
              />
            </Field>

            <Field label="Work Email Address" htmlFor="email">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. m.adeyemi@workforce.gov.ng"
                autoComplete="email"
                className={fieldClass}
              />
            </Field>

            <Field label="Organisation Type" htmlFor="organisation-type">
              <Select
                id="organisation-type"
                value={organisationType}
                onChange={setOrganisationType}
                placeholder="Select organisation type"
                options={ORG_TYPES}
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Estimated Number of Users" htmlFor="user-count">
              <Select
                id="user-count"
                value={userCount}
                onChange={setUserCount}
                placeholder="Select a range"
                options={ESTIMATED_USERS}
              />
            </Field>
          </div>

          <fieldset className="mt-4">
            <legend className="text-sm font-medium leading-[18px] text-heading">
              Which modules are you interested in? <Required />
            </legend>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {MODULES.map((module) => (
                <label
                  key={module.value}
                  className="flex cursor-pointer items-center gap-2 text-sm text-body"
                >
                  <input
                    type="checkbox"
                    checked={modules.includes(module.value)}
                    onChange={() => toggleModule(module.value)}
                    className="size-4 rounded-sm accent-primary"
                  />
                  {module.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-4">
            <Field label="Anything else we should know?" htmlFor="notes">
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Enter any special deployment constraints, why you need this service or questions you might have here..."
                className={cn(fieldClass, "h-auto resize-none py-3")}
              />
            </Field>
          </div>

          {/* Announced, not just coloured: someone whose submission failed has
              to be told, and they may not be looking at this part of the page. */}
          {error ? (
            <p
              role="alert"
              className="mt-6 rounded-md border border-accent/40 bg-primary-wash px-4 py-3 text-sm text-accent"
            >
              {error}
            </p>
          ) : null}

          {/* 80px above Submit — the frame's container gap. */}
          <Button
            type="submit"
            disabled={!complete || sending}
            fullWidth
            className={error ? "mt-6" : "mt-12 lg:mt-20"}
          >
            {sending ? "Submitting…" : "Submit"}
          </Button>
        </form>
      </div>

      {submitted ? <SuccessModal /> : null}
    </>
  );
}

function Required() {
  return (
    <span className="text-accent" aria-hidden="true">
      *
    </span>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-heading">
        {label} <Required />
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  placeholder,
  options,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Option[];
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // A native select: the frame draws a plain chevron field, and the native
      // control is what gives keyboard and mobile behaviour for free.
      className={cn(
        fieldClass,
        "appearance-none pr-9",
        value === "" && "text-muted",
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "1.15rem",
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {/* value is the API's enum, the text is what the reader reads — the two
          are not the same string, which is why Option carries both. */}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/*
  Measured: 369 x Hug 264 · radius 12 · padding 32 · gap 24 · #FFFFFF.
  Title is H4/Semi Bold on a 32px line; the body is Body/Regular 14/20 in
  Gray/Gray 2. Both centred.

  The burst is the SAME icon and the same `grow-shrink` loop as the TDARS app's
  payment-success modal — one product, so the two success moments should not
  animate differently. Its 64px #CCFFCC disc is drawn inside the SVG, which is
  why there is no separate halo element here.
*/
function SuccessModal() {
  return (
    /*
      A real modal: a scrim over the form, with the card floating centred above
      it. The form stays mounted underneath — the frame shows it dimmed behind
      the card, and replacing the page instead made this read as a new screen
      rather than a confirmation.

      `role="dialog"` + `aria-modal` announce it as a dialog; `aria-live` makes a
      screen reader speak it without needing focus, which matters because it
      dismisses itself after 1200ms and there is nothing to interact with.
    */
    <div /* A 30% scrim reads clearly over the light page but barely registers
             over a dark one, so it deepens in dark mode. */
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-5 dark:bg-black/70"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-live="polite"
        className="flex w-full max-w-[369px] flex-col items-center gap-6 rounded-md bg-surface p-8 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]"
      >
        <SuccessBurstIcon className="animate-grow-shrink" />

        <h1 className="font-heading text-h4 leading-8 text-heading">
          Request submitted
        </h1>

        <p className="text-sm leading-5 text-body">
          Thank you for your interest in TDARS. Our team will review your
          request and reach out within 2 business days to schedule a
          walkthrough.
        </p>
      </div>
    </div>
  );
}
