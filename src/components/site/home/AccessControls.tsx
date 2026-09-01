import { CheckCircleIcon, ChevronRightIcon, MinusCircleIcon } from "./icons";

/*
  design/site/web/home-web7.png · design/site/mobile/home-mobile13-14.png

  Mock-up left, copy right on desktop; stacked on mobile, mock-up first (same DOM
  order either way).

  TODO(review): the access-review panel is a product mock-up drawn in Figma but never
  exported, so it is rebuilt here in markup rather than shipped as a grey box — every
  colour comes from a token. Two consequences worth a look:
    • The frame keeps the panel's two inner columns side by side even at 390px, where
      the type is far too small to read. Here they stack below `sm` so the panel stays
      legible and the page never scrolls sideways.
    • The policy list is numbered 01 / 02 / 02 / 02 in the Figma. Kept verbatim —
      presumably it should read 01–04.
*/
const POLICIES = [
  {
    number: "01",
    title: "Personnel records",
    subtitle: "Records custodians",
    active: true,
  },
  { number: "02", title: "Identity documents", subtitle: "Restricted review group" },
  { number: "02", title: "Service history", subtitle: "Benefits assessment team" },
  { number: "02", title: "Executive records", subtitle: "Named individuals only" },
];

const PERMISSIONS = [
  { label: "View records", value: "Custodian + supervisor", allowed: true },
  { label: "Export documents", value: "Named approvers only", allowed: true },
  { label: "Change status", value: "Two-step approval", allowed: true },
  { label: "Delete record", value: "Not permitted", allowed: false },
];

const CONTROLS = [
  {
    number: "01",
    title: "Role-based access",
    description: "Set exactly who can view, edit, or export each type of record.",
  },
  {
    number: "02",
    title: "Full audit trail",
    description: "Every action on every record is logged, who did what, and when.",
  },
  {
    number: "03",
    title: "Deploy your way",
    description:
      "Cloud, on-premise, or air-gapped, choose the setup that fits your security needs.",
  },
];

function AccessReviewMockup() {
  return (
    <div aria-hidden="true" className="relative mb-14 lg:mb-16">
      <div className="overflow-hidden rounded-md border border-border bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <span className="text-micro tracking-widest text-muted uppercase">
            Security / Access review
          </span>
          <span className="flex items-center gap-2 text-micro font-semibold tracking-widest text-success uppercase">
            <span className="size-1.5 rounded-full bg-success" />
            Policy active
          </span>
        </div>

        {/* The frame splits the panel ~46/54, which is what lets the permission rows
            sit on one line at 11px. */}
        <div className="grid divide-y divide-border sm:grid-cols-[0.85fr_1fr] sm:divide-x sm:divide-y-0">
          <div className="p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-micro tracking-widest text-muted uppercase">
                Access policies
              </span>
              <span className="text-micro font-semibold tracking-widest text-success uppercase">
                4 active
              </span>
            </div>

            <ul className="mt-4 space-y-1">
              {POLICIES.map((policy) => (
                <li
                  key={policy.title}
                  className={
                    policy.active
                      ? "flex items-center gap-3 rounded-md bg-surface-subtle px-3 py-2.5"
                      : "flex items-center gap-3 px-3 py-2.5"
                  }
                >
                  <span className="text-micro text-muted">{policy.number}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-micro font-semibold text-heading">
                      {policy.title}
                    </span>
                    <span className="block truncate text-micro text-muted">
                      {policy.subtitle}
                    </span>
                  </span>
                  <ChevronRightIcon className="size-4 shrink-0 text-muted" />
                </li>
              ))}
            </ul>
          </div>

          {/* The extra bottom padding is the slack home-web7 leaves under the last
              row — it is what the audit-event card overhangs into. */}
          <div className="p-5 pb-16">
            <div className="flex items-center justify-between gap-4">
              <span className="text-micro tracking-widest text-heading uppercase">
                Policy 01
              </span>
              <span className="rounded-full bg-success-soft px-3 py-1 text-micro font-medium text-success">
                Enabled
              </span>
            </div>

            <p className="mt-5 text-micro font-semibold text-heading">Personnel records</p>
            <p className="mt-1 text-micro text-muted">
              Applies to all records in the personnel archive.
            </p>

            <ul className="mt-4 divide-y divide-border border-t border-border">
              {PERMISSIONS.map((permission) => (
                <li key={permission.label} className="flex items-center gap-3 py-3.5">
                  <span className="min-w-0 flex-1 text-micro text-muted">
                    {permission.label}
                  </span>
                  <span className="text-micro font-semibold text-heading">
                    {permission.value}
                  </span>
                  {permission.allowed ? (
                    <CheckCircleIcon className="size-4 shrink-0 text-success" />
                  ) : (
                    <MinusCircleIcon className="size-4 shrink-0 text-primary" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Overhangs the panel's bottom-right corner, as in home-web7 — the wrapper's
          bottom margin is what keeps it clear of the copy below. */}
      <div className="absolute right-0 bottom-0 w-4/5 translate-y-1/2 rounded-md border border-dashed border-primary/30 bg-primary-wash p-4 sm:w-3/5 lg:w-1/2">
        <div className="flex items-center justify-between gap-3">
          <span className="text-micro tracking-widest text-primary uppercase">
            Audit event · 09:42
          </span>
          <span className="rounded-full bg-success-soft px-2 py-0.5 text-micro tracking-wide text-success uppercase">
            Recorded
          </span>
        </div>
        <p className="mt-2 text-micro font-semibold text-heading">
          Export permission approved
        </p>
        <p className="mt-1 text-micro text-muted">Policy 01 · Authorised reviewer</p>
      </div>
    </div>
  );
}

export function AccessControls() {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
      <AccessReviewMockup />

      <div>
        <h2
          id="access-controls-title"
          className="max-w-md font-heading text-h2 text-heading lg:text-h2-lg"
        >
          Access controls that actually work.
        </h2>

        <p className="mt-4 text-base leading-relaxed text-body">
          With TDARS, permissions, evidence, and accountability are part of everyday
          work, not a separate checklist people skip.
        </p>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {CONTROLS.map((control) => (
            <li key={control.number} className="flex gap-5 py-5">
              <span aria-hidden="true" className="pt-1 text-xs text-muted">
                {control.number}
              </span>
              <div>
                <h3 className="font-heading text-h4 text-heading">{control.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-body lg:text-sm lg:leading-normal">
                  {control.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
