import type { ReactNode } from "react";

import { SearchIcon } from "./icons";

/*
  design/site/web/home-web8.png · design/site/mobile/home-mobile15-17.png

  Full-bleed #2D2D2D band, three columns split by hairlines on desktop and stacked on
  mobile.

  TODO(review): each column ends in a product vignette that Figma draws but never
  exported. They are rebuilt in markup from tokens only, which costs two details:
  the intake sheet loses its navy/gold accents and its "PERSONNEL INTAKE" microcopy
  (both sit outside the palette at sizes below `text-xs`). Export the three
  illustrations and they drop straight in.
*/
function IntakeIllustration() {
  return (
    <div className="flex h-56 items-center justify-center rounded-md bg-surface-subtle p-6">
      <div className="flex h-full w-full items-center justify-center rounded-md bg-border/60">
        <div className="relative h-40 w-32">
          <div className="absolute inset-0 translate-x-3 rotate-6 rounded-sm border border-border bg-surface" />
          <div className="absolute inset-0 -rotate-3 rounded-sm border border-border bg-surface p-3">
            <span className="flex size-7 items-center justify-center rounded-sm bg-heading text-micro font-semibold text-primary-foreground">
              T
            </span>
            <div className="mt-5 space-y-2">
              <div className="h-1 rounded-full bg-border" />
              <div className="h-1 w-4/5 rounded-full bg-border" />
              <div className="h-1 w-3/5 rounded-full bg-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const EXTRACTED_FIELDS = [
  { label: "Name", value: "Marian Adeyemi", score: "98" },
  { label: "Service ID", value: "TD-8841-06", score: "96" },
  { label: "Record type", value: "Appointment", score: "94" },
];

function ProcessingIllustration() {
  return (
    <div className="flex h-56 items-center rounded-md bg-surface-subtle p-5">
      <div className="w-full space-y-2 rounded-md bg-border/60 p-3">
        {EXTRACTED_FIELDS.map((field) => (
          <div
            key={field.label}
            className="flex items-center gap-3 rounded-md bg-surface px-3 py-2.5"
          >
            <span className="min-w-0 flex-1 truncate text-micro text-muted">
              {field.label}
            </span>
            <span className="truncate text-micro font-semibold text-heading">
              {field.value}
            </span>
            <span className="shrink-0 rounded-full bg-success-soft px-2 py-0.5 text-micro text-success">
              {field.score}
            </span>
          </div>
        ))}

        <div className="mt-4 h-6 overflow-hidden rounded-full bg-primary-soft">
          <div className="flex h-full w-3/5 items-center rounded-full bg-primary px-3 text-micro whitespace-nowrap text-primary-foreground">
            Preparing field for review
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIllustration() {
  return (
    <div className="flex h-56 items-center rounded-md bg-surface-subtle p-5">
      <div className="w-full space-y-3">
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2.5">
          <SearchIcon className="size-4 shrink-0 text-muted" />
          <span className="min-w-0 flex-1 truncate text-micro text-heading">
            TD-8841-06
          </span>
          <span className="shrink-0 rounded-sm border border-border px-1.5 text-micro text-muted">
            ⌘K
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-micro font-semibold text-primary">
            MA
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-micro font-semibold text-heading">
              Marian Adeyemi
            </span>
            <span className="block truncate text-micro text-muted">
              Personnel · Active
            </span>
          </span>
          <span className="shrink-0 text-micro font-semibold text-primary">+3</span>
        </div>
      </div>
    </div>
  );
}

type Pillar = {
  title: string;
  description: string;
  illustration: ReactNode;
};

const PILLARS: Pillar[] = [
  {
    title: "Capture from anywhere",
    description:
      "Scan paper files, upload documents, or pull from email — everything lands in one secure, searchable archive.",
    illustration: <IntakeIllustration />,
  },
  {
    title: "Smart processing",
    description:
      "Documents are automatically sorted, indexed, and routed to the right person for review.",
    illustration: <ProcessingIllustration />,
  },
  {
    title: "Find it fast",
    description:
      "Search across your entire archive instantly. Permissions and audit trails stay intact.",
    illustration: <SearchIllustration />,
  },
];

export function StillOnPaper() {
  return (
    <>
      <h2
        id="still-on-paper-title"
        className="max-w-2xl font-heading text-h2 text-white lg:text-h2-lg"
      >
        Still running on paper? Now you found a better way.
      </h2>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
        Government agencies, security institutions, and large organisations lose time,
        money, and trust when records live in filing cabinets and spreadsheets. TDARS
        changes that.
      </p>

      <ul className="mt-10 divide-y divide-white/15 lg:mt-14 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:border-t lg:border-white/15">
        {PILLARS.map((pillar, index) => (
          <li
            key={pillar.title}
            className={
              index === 0
                ? "pb-10 lg:pt-10 lg:pr-8 lg:pb-0"
                : "py-10 lg:px-8 lg:py-10 lg:last:pr-0"
            }
          >
            <h3 className="font-heading text-h3 text-white lg:text-h3-lg">
              {pillar.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/70 lg:text-sm lg:leading-normal">
              {pillar.description}
            </p>
            <div className="mt-6 lg:mt-8">{pillar.illustration}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
