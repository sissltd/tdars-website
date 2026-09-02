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

  return (
    <>
      {/* Hug 684 · 32px padding · 12px radius · hairline. Full-bleed below `sm`. */}
      <div className="w-full max-w-[684px] rounded-md border-border bg-surface sm:border sm:p-8">
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

      {/* 358 x 26 — H3/Semi Bold.
          TODO(review): the frame gives this #1D2939, a blue-tinted near-black
          that is not in the grey ramp (Gray/Gray 1 is #373737). One heading is
          not worth its own token — confirm whether it is intentional. */}
      <h1 className="mt-4 font-heading text-h3 font-semibold text-heading">
        Request access
      </h1>
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
          <legend className="text-sm font-medium leading-[18px] text-heading">
            Which modules are you interested in? <Required />
          </legend>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
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
      </div>

      {submitted ? <SuccessModal /> : null}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-live="polite"
        className="flex w-full max-w-[369px] flex-col items-center gap-6 rounded-md bg-surface p-8 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]"
      >
      <SuccessBurstIcon className="animate-grow-shrink" />

      <h1 className="font-heading text-h4 leading-8 text-heading">Request submitted</h1>

      <p className="text-sm leading-5 text-body">
        Thank you for your interest in TDARS. Our team will review your request and
        reach out within 2 business days to schedule a walkthrough.
        </p>
      </div>
    </div>
  );
}

/** Yemi's confetti burst, shared with the app's payment-success modal. */
function SuccessBurstIcon({ className }: { className?: string }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="32" fill="#CCFFCC" />
      <path d="M31.9998 50.3337C42.0832 50.3337 50.3332 42.0837 50.3332 32.0003C50.3332 21.917 42.0832 13.667 31.9998 13.667C21.9165 13.667 13.6665 21.917 13.6665 32.0003C13.6665 42.0837 21.9165 50.3337 31.9998 50.3337Z" stroke="#008500" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.2085 31.9999L29.3968 37.1882L39.7918 26.8115" stroke="#008500" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32.0001" cy="27.0061" r="0.881327" transform="rotate(-170.986 32.0001 27.0061)" fill="#4DD9BF" fillOpacity="0.85" />
      <rect x="10.1611" y="15" width="4.28544" height="2.22139" rx="0.5" transform="rotate(31.5177 10.1611 15)" fill="#FF4D59" fillOpacity="0.85" />
      <rect x="38.7539" y="36.0146" width="4.28544" height="2.22139" rx="0.5" transform="rotate(31.5177 38.7539 36.0146)" fill="#FF4D59" fillOpacity="0.85" />
      <circle cx="51.2863" cy="30.2859" r="0.926434" transform="rotate(-34.0527 51.2863 30.2859)" fill="#D966E6" fillOpacity="0.85" />
      <rect x="13" y="35.2227" width="3.64848" height="2.40934" rx="0.5" transform="rotate(-62.0319 13 35.2227)" fill="#4DD9BF" fillOpacity="0.85" />
      <circle cx="14.3656" cy="24.3658" r="0.995997" transform="rotate(59.1506 14.3656 24.3658)" fill="#4DD9BF" fillOpacity="0.85" />
      <circle cx="11.1295" cy="41.1294" r="1.60596" transform="rotate(-65.3439 11.1295 41.1294)" fill="#D966E6" fillOpacity="0.85" />
      <circle cx="21.4411" cy="35.4416" r="1.02528" transform="rotate(141.297 21.4411 35.4416)" fill="#66D966" fillOpacity="0.85" />
      <circle cx="29.4411" cy="43.4416" r="1.02528" transform="rotate(141.297 29.4411 43.4416)" fill="#66D966" fillOpacity="0.85" />
      <circle cx="32.2782" cy="13.278" r="0.914245" transform="rotate(36.2961 32.2782 13.278)" fill="#FF4D59" fillOpacity="0.85" />
      <circle cx="40.2782" cy="21.278" r="0.914245" transform="rotate(36.2961 40.2782 21.278)" fill="#FF4D59" fillOpacity="0.85" />
      <circle cx="44.7143" cy="27.7141" r="1.38686" transform="rotate(-74.0679 44.7143 27.7141)" fill="#FF4D59" fillOpacity="0.85" />
      <circle cx="52.7143" cy="35.7141" r="1.38686" transform="rotate(-74.0679 52.7143 35.7141)" fill="#FF4D59" fillOpacity="0.85" />
      <rect x="20.7671" y="19.8047" width="2.19533" height="2.08013" rx="0.5" transform="rotate(112.745 20.7671 19.8047)" fill="#4DD9BF" fillOpacity="0.85" />
      <rect x="48.8545" y="21.2598" width="4.0694" height="1.33713" rx="0.5" transform="rotate(-102.121 48.8545 21.2598)" fill="#66D966" fillOpacity="0.85" />
      <circle cx="30.9295" cy="44.9298" r="0.759742" transform="rotate(104.881 30.9295 44.9298)" fill="#FFBF1A" fillOpacity="0.85" />
      <circle cx="38.9295" cy="52.9298" r="0.759742" transform="rotate(104.881 38.9295 52.9298)" fill="#FFBF1A" fillOpacity="0.85" />
      <circle cx="44.4915" cy="42.4911" r="1.355" transform="rotate(-173.898 44.4915 42.4911)" fill="#FFBF1A" fillOpacity="0.85" />
    </svg>
  );
}
