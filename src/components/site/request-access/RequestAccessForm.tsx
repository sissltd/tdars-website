"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/site/Button";
import { cn } from "@/lib/cn";

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

const ORGANISATION_TYPES = [
  // TODO(review): only "Government ministry" is legible in the frame — the
  // select is shown closed. The rest are drawn from the audiences on Home
  // ("Who is TDARS built for?") so the list is at least the product's own
  // vocabulary rather than invented. Confirm the real options.
  "Government ministry",
  "Military command",
  "Security agency",
  "Parastatal or agency",
  "Educational institution",
  "Other",
];

const USER_COUNTS = [
  // The frame shows "50 - 300". These bands are the subscription tiers as the
  // Terms define them (Essential up to 50 · Business up to 300 · Executive
  // unlimited), so the form and the pricing agree.
  "Up to 50",
  "50 - 300",
  "300+",
];

const MODULES = ["Scan Terminal", "Records System", "MockRadar", "Proctored CBT"];

const fieldClass =
  "h-11 w-full rounded-md border border-border bg-surface-subtle px-3 text-sm text-heading outline-none placeholder:text-muted focus:border-primary";

export function RequestAccessForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

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

  if (submitted) return <SuccessCard />;

  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-heading transition-colors hover:text-primary"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="m9 9 6 6m0-6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Close
      </Link>

      <h1 className="mt-4 font-heading text-h2 text-heading">Request access</h1>
      <p className="mt-2 text-sm text-body">
        Tell us about your organisation and we&apos;ll get back to you within 2 business
        days.
      </p>

      <form
        className="mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          /*
            TODO(review): no endpoint exists yet — same open question as the
            footer's contact form. The success state is shown so the flow can be
            reviewed end to end; wire this to the real handler when there is one.
          */
          setSubmitted(true);
        }}
      >
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
              placeholder="Government ministry"
              options={ORGANISATION_TYPES}
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Estimated Number of Users" htmlFor="user-count">
            <Select
              id="user-count"
              value={userCount}
              onChange={setUserCount}
              placeholder="50 - 300"
              options={USER_COUNTS}
            />
          </Field>
        </div>

        <fieldset className="mt-4">
          <legend className="text-sm text-heading">
            Which modules are you interested in? <Required />
          </legend>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
            {MODULES.map((module) => (
              <label
                key={module}
                className="flex cursor-pointer items-center gap-2 text-sm text-body"
              >
                <input
                  type="checkbox"
                  checked={modules.includes(module)}
                  onChange={() => toggleModule(module)}
                  className="size-4 rounded-sm accent-primary"
                />
                {module}
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

        {/* 80px above Submit — the frame's container gap. */}
        <Button type="submit" disabled={!complete} fullWidth className="mt-12 lg:mt-20">
          Submit
        </Button>
      </form>
    </>
  );
}

function Required() {
  return (
    <span className="text-primary" aria-hidden="true">
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
  options: string[];
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // A native select: the frame draws a plain chevron field, and the native
      // control is what gives keyboard and mobile behaviour for free.
      className={cn(fieldClass, "appearance-none pr-9", value === "" && "text-muted")}
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
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

/*
  369 x hug, 12px radius, 32px padding, 24px gap — measured off the frame.

  TODO(review): the tick is a multi-colour illustration (green ring on a mint
  disc, with confetti) that was not exported. Rebuilt from tokens: the ring and
  disc are right, the confetti is not reproduced. Drop the asset into
  `public/images/` and swap this block for it.
*/
function SuccessCard() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto flex w-full max-w-[369px] flex-col items-center gap-6 rounded-md bg-surface p-8 text-center"
    >
      <span className="flex size-24 items-center justify-center rounded-full bg-success-soft">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-12">
          <circle cx="12" cy="12" r="9" stroke="var(--success)" strokeWidth="2" />
          <path
            d="m8 12.5 2.5 2.5L16 9.5"
            stroke="var(--success)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h1 className="font-heading text-h2 text-heading">Request submitted</h1>

      <p className="text-base leading-relaxed text-body">
        Thank you for your interest in TDARS. Our team will review your request and
        reach out within 2 business days to schedule a walkthrough.
      </p>
    </div>
  );
}
