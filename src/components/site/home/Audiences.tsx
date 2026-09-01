import { Badge } from "@/components/site/Badge";
import { IconPlaceholder } from "./AssetPlaceholder";

/*
  design/site/web/home-web6.png · design/site/mobile/home-mobile10-13.png

  Six cards inside one outlined wrapper. Both the wrapper and the cards sample the
  same #FAFAFA as the band behind them, so nothing here is filled — the cards are
  hairlines only (see design/TOKENS.md → "Colors checked during the Home build").
*/
type Audience = {
  name: string;
  description: string;
  tags: string[];
};

const AUDIENCES: Audience[] = [
  {
    name: "Government",
    description:
      "Manage personnel, citizen, and administrative records with full operational control.",
    tags: ["Ministries", "Agencies"],
  },
  {
    name: "Defence & security",
    description:
      "Secure records management for high-sensitivity, restricted environments.",
    tags: ["Ministries", "Agencies"],
  },
  {
    name: "Pensions & benefits",
    description:
      "Quickly locate and verify the documents behind pensions, benefits, and entitlements.",
    tags: ["Ministries", "Agencies"],
  },
  {
    name: "Large enterprises",
    description:
      "Centralise employee documentation, streamline compliance, and simplify HR record management.",
    tags: ["HR", "Compliance"],
  },
  {
    // TODO(review): "irganizations" is a typo in the Figma. Copy is verbatim per the
    // brief — say the word and it becomes "Healthcare organisations".
    name: "Healthcare irganizations",
    description:
      "Long-term record keeping with proper access controls and full traceability that gives you everything.",
    tags: ["Workforce", "Archives"],
  },
  {
    name: "Education Industries",
    description:
      "Long-term record keeping with proper access controls and full traceability that gives you everything.",
    tags: ["Workforce", "Archives"],
  },
];

export function Audiences() {
  return (
    <>
      <Badge>Who is TDARS built for?</Badge>

      <h2
        id="audiences-title"
        className="mt-5 max-w-2xl font-heading text-h2 text-heading lg:text-h2-lg"
      >
        Built for organisations that can&apos;t afford to lose a record
      </h2>

      <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
        Whether you manage personnel files, citizen records, or classified documents,
        TDARS gives every team a single source of truth with the right controls built
        in.
      </p>

      <div className="mt-10 rounded-lg border border-border p-3 lg:mt-14">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((audience) => (
            <li
              key={audience.name}
              className="flex flex-col rounded-md border border-border p-6"
            >
              <IconPlaceholder className="size-8" />

              <h3 className="mt-8 font-heading text-h4 text-heading">{audience.name}</h3>

              <p className="mt-3 text-base leading-relaxed text-body">
                {audience.description}
              </p>

              {/* Absorbs the slack the grid hands taller neighbours, so the rules line
                  up across a row without collapsing the gap on a stacked mobile card. */}
              <div aria-hidden="true" className="grow" />

              <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5 lg:pt-8">
                {audience.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-micro tracking-wide text-muted uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
