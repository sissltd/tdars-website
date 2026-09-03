import {
  CheckCircleIcon,
  ChevronRightIcon,
  MinusCircleIcon,
} from "@/components/site/icons";
import { Reveal } from "@/components/site/Reveal";

/*
  design/site/web/home-web7.png · design/site/mobile/home-mobile13-14.png

  Mock-up left, copy right on desktop; stacked on mobile, mock-up first (same DOM
  order either way).

  Measured off the frame:
    Section   Fill 1440 x Hug 698 · HORIZONTAL · padding 120/80 · gap 60 · #FAFAFA
              (mobile: 390 · vertical · padding 40/16 · gap 40)
              Note the 120px vertical padding — half again the 80 used elsewhere.
    Copy      FIXED 584 x Hug 455.94 · gap 20
      H2        584 x 88 (2 lines/44) — H2/Bold, Gray/Gray 1
      Body      584 x 48 (2 lines/24) — Body 1/MEDIUM, ALSO Gray/Gray 1
      Row title Body 1/SEMI BOLD — Inter 600, NOT the Bricolage H4 it was using
      Row body  Caption/Regular — 11/16 mobile, 12/18 desktop, Gray/Gray 2
      Numeral   CONSOLAS 12px/150%, Gray/Gray 2 — a monospace, unlike every other
                numeral on the page
    Panel     FIXED 583 x 414 · radius 12 · border 1.5px #E6E6E6 · #FFFFFF
      columns   260 fixed + 323 fill · padding 32/20 · gap 12 · 1px rule between
    Audit     FIXED 266 x Hug 77 at top 381 / left 344 of a 610 x 458 group
              radius 8 · border 2.5px DASHED #E28D83 · #FDF7F7 · padding 12
              label 8px #B93A2C · title 11px BOLD #4D4D4D · meta 8px/12 #4D4D4D

  ⚠️ INFERRED: the control rows' vertical padding. The copy column's 455.94 total
  back-solves to ~24px top and bottom once the H2, body, gaps and four hairlines
  are removed, but the inspector never states it.

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
  {
    number: "02",
    title: "Identity documents",
    subtitle: "Restricted review group",
  },
  {
    number: "02",
    title: "Service history",
    subtitle: "Benefits assessment team",
  },
  {
    number: "02",
    title: "Executive records",
    subtitle: "Named individuals only",
  },
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
    description:
      "Set exactly who can view, edit, or export each type of record.",
  },
  {
    number: "02",
    title: "Full audit trail",
    description:
      "Every action on every record is logged, who did what, and when.",
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
    /* The audit card hangs 44px below the panel (top 381 + 77 tall against a
       414 panel), so the wrapper reserves exactly that much. */
    <div aria-hidden="true" className="relative mb-11">
      <div className="rounded-md border-[1.5px] border-border bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-5">
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
        {/* 260 fixed against 323 fill — kept as a ratio so the panel still scales. */}
        <div className="grid divide-y divide-border sm:grid-cols-[260fr_323fr] sm:divide-x sm:divide-y-0">
          <div className="px-5 py-8">
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
          <div className="px-5 pt-8 pb-16">
            <div className="flex items-center justify-between gap-4">
              <span className="text-micro tracking-widest text-heading uppercase">
                Policy 01
              </span>
              <span className="rounded-full bg-success-soft px-3 py-1 text-micro font-medium text-success">
                Enabled
              </span>
            </div>

            <p className="mt-5 text-micro font-semibold text-heading">
              Personnel records
            </p>
            <p className="mt-1 text-micro text-muted">
              Applies to all records in the personnel archive.
            </p>

            <ul className="mt-4 divide-y divide-border border-t border-border">
              {PERMISSIONS.map((permission) => (
                <li
                  key={permission.label}
                  className="flex items-center gap-3 py-3.5"
                >
                  <span className="min-w-0 flex-1 text-micro text-muted">
                    {permission.label}
                  </span>
                  <span className="text-micro font-semibold text-heading">
                    {permission.value}
                  </span>
                  {permission.allowed ? (
                    <CheckCircleIcon className="size-4 shrink-0 text-success" />
                  ) : (
                    <MinusCircleIcon className="size-4 shrink-0 text-accent" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/*
        Placed by the frame's own coordinates rather than by eye: left 344 and
        width 266 against the 583px panel, hanging 44px past its bottom edge.
        That is what puts it 27px clear of the panel's right side.

        The rule is 2.5px DASHED in Primary 2, not the hairline it was.
      */}
      <div className="absolute -bottom-11 left-[59%] w-[45.6%] rounded-sm border-[2.5px] border-dashed border-primary-2 bg-primary-wash p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[8px] text-accent uppercase">
            Audit event · 09:42
          </span>
          <span className="rounded-full bg-success-soft px-2 py-0.5 text-[8px] text-success uppercase">
            Recorded
          </span>
        </div>
        <p className="mt-2 text-micro font-bold text-body">
          Export permission approved
        </p>
        <p className="mt-1 text-[8px] leading-3 text-body">
          Policy 01 · Authorised reviewer
        </p>
      </div>
    </div>
  );
}

export function AccessControls() {
  return (
    /*
      1280 less the 60px gap is 610 per column — the frame's left group exactly.
      The copy sits at 584 inside its own 610.

      FLEX, not plain blocks, on mobile. The mock-up reserves 44px below itself
      for the audit card's overhang, and a sibling top margin would COLLAPSE
      against that reserve rather than adding to it — leaving the card sitting
      flush on the heading. A flex container does not collapse margins, so the
      40px gap is the frame's 40px gap.
    */
    <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-15">
      <Reveal from="left">
        <AccessReviewMockup />
      </Reveal>

      <Reveal
        from="right"
        delay={120}
        className="flex flex-col gap-5 lg:max-w-[584px]"
      >
        <h2
          id="access-controls-title"
          className="font-heading text-h2 font-bold text-heading lg:text-h2-lg"
        >
          Access controls that actually work.
        </h2>

        <p className="text-sm leading-5 font-medium text-heading lg:text-base lg:leading-6">
          With TDARS, permissions, evidence, and accountability are part of
          everyday work, not a separate checklist people skip.
        </p>

        <ul className="divide-y divide-border border-y border-border">
          {CONTROLS.map((control) => (
            <li key={control.number} className="flex gap-4 py-5 lg:py-6">
              {/*
                Consolas 12/18 — the frame sets these numerals in a MONOSPACE,
                where every other numeral on the page is Bricolage. It keeps the
                three digits on a fixed 14px column so the titles line up.
              */}
              <span
                aria-hidden="true"
                className="pt-0.5 font-mono text-xs leading-[18px] text-body"
              >
                {control.number}
              </span>
              <div>
                <h3 className="text-sm leading-5 font-semibold text-heading lg:text-base lg:leading-6">
                  {control.title}
                </h3>
                <p className="mt-1 text-micro text-body lg:text-xs lg:leading-[18px]">
                  {control.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
