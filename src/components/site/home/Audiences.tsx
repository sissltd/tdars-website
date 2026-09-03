import type { ComponentType } from "react";

import { Badge } from "@/components/site/Badge";
import { HeadingLines } from "@/components/site/HeadingLines";
import {
  DefenceSecurityIcon,
  EducationIcon,
  GovernmentIcon,
  HealthcareIcon,
  LargeEnterprisesIcon,
  PensionsBenefitsIcon,
} from "@/components/site/icons";
import { Reveal } from "@/components/site/Reveal";

/*
  design/site/web/home-web6.png · design/site/mobile/home-mobile10-13.png

  Six cards inside one outlined wrapper. Both the wrapper and the cards sample the
  same #FAFAFA as the band behind them, so nothing here is filled — the cards are
  hairlines only.

  Measured off the frame:
    Section   Fixed 1440 x Hug 1074 · padding 80/80/40/80 · gap 60 · #FAFAFA
              (mobile: 390 · 40/16/20/16 · gap 40)
    Header    Hug 720 x Hug 200 · gap 12
    Wrapper   Fill 1280 x Hug 694 · radius 20 · border 2px #E6E6E6 · padding 12
              row gap 40, column gap 20   (mobile: radius 20 · 2px · padding 12 · gap 20)
    Card      Fill 405.33 x Hug 303 · radius 12 · 1px #E6E6E6 · padding 30/20 · gap 40
              (mobile: Fill 334 x Hug 226 · padding 12 · gap 16)
    Icon      40 x 40
    Title     H5/BOLD — 16/22 mobile, 20/30 desktop, Gray/Gray 1
    Body      Body 1/MEDIUM — 14/20 mobile, 16/24 desktop, Gray/Gray 2
    Tag       Hug x 30 · radius 20 · 1px #999999 · padding 6/8 · gap 10
              Caption/Medium 11/16, #999999, letter-spacing 0

  The card body is Body 1/MEDIUM, not the Body 2 the other card grids use — a
  size larger and a weight heavier.

  Two notes on the frame itself:
  - The section's bottom padding is HALF its top (40 vs 80, 20 vs 40 on mobile),
    because the next section continues the same #FAFAFA band.
  - ⚠️ This H2 is a detached #3B3B3B rather than Gray/Gray 1 #373737 — no token
    name beside it in the inspector, where every other H2 on the page carries
    one. Treated as an oversight and left on `text-heading`; worth confirming
    with Yemi rather than hardcoding a hex that exists nowhere else.
*/
type Audience = {
  name: string;
  description: string;
  tags: string[];
  Icon: ComponentType<{ className?: string }>;
};

const AUDIENCES: Audience[] = [
  {
    name: "Government",
    Icon: GovernmentIcon,
    description:
      "Manage personnel, citizen, and administrative records with full operational control.",
    tags: ["Ministries", "Agencies"],
  },
  {
    name: "Defence & security",
    Icon: DefenceSecurityIcon,
    description:
      "Secure records management for high-sensitivity, restricted environments.",
    tags: ["Ministries", "Agencies"],
  },
  {
    name: "Pensions & benefits",
    Icon: PensionsBenefitsIcon,
    description:
      "Quickly locate and verify the documents behind pensions, benefits, and entitlements.",
    tags: ["Ministries", "Agencies"],
  },
  {
    name: "Large enterprises",
    Icon: LargeEnterprisesIcon,
    description:
      "Centralise employee documentation, streamline compliance, and simplify HR record management.",
    tags: ["HR", "Compliance"],
  },
  {
    // TODO(review): "irganizations" is a typo in the Figma. Copy is verbatim per the
    // brief — say the word and it becomes "Healthcare organisations".
    name: "Healthcare irganizations",
    Icon: HealthcareIcon,
    description:
      "Long-term record keeping with proper access controls and full traceability that gives you everything.",
    tags: ["Workforce", "Archives"],
  },
  {
    name: "Education Industries",
    Icon: EducationIcon,
    description:
      "Long-term record keeping with proper access controls and full traceability that gives you everything.",
    tags: ["Workforce", "Archives"],
  },
];

export function Audiences() {
  return (
    /* gap 60 desktop / 40 mobile between the header and the card wrapper. */
    <div className="flex flex-col gap-10 lg:gap-15">
      <Reveal>
        <header className="flex flex-col gap-3 lg:max-w-[720px]">
          <Badge className="self-start">Who is TDARS built for?</Badge>

          <h2
            id="audiences-title"
            className="font-heading text-h2 font-bold text-heading lg:text-h2-lg"
          >
            <HeadingLines
              lines={[
                "Built for organisations that can’t afford to",
                "lose a record",
              ]}
            />
          </h2>

          <p className="text-sm leading-5 font-medium text-heading lg:text-base lg:leading-6">
            Whether you manage personnel files, citizen records, or classified
            documents, TDARS gives every team a single source of truth with the
            right controls built in.
          </p>
        </header>
      </Reveal>

      {/* The wrapper's rule is 2px where the cards inside it are 1px. */}
      <div className="rounded-lg border-2 border-border p-3">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
          {AUDIENCES.map(({ name, description, tags, Icon }, index) => (
            <Reveal
              as="li"
              key={name}
              delay={index * 60}
              className="flex flex-col gap-4 rounded-md border border-border p-3 lg:gap-10 lg:px-5 lg:py-[30px]"
            >
              <Icon className="size-10 shrink-0" />

              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-base leading-[22px] font-bold text-heading lg:text-h5 lg:font-bold">
                  {name}
                </h3>

                <p className="text-sm leading-5 font-medium text-body lg:text-base lg:leading-6">
                  {description}
                </p>
              </div>

              {/* Absorbs the slack the grid hands taller neighbours, so the rules line
                  up across a row without collapsing the gap on a stacked mobile card. */}
              <div aria-hidden="true" className="grow" />

              <ul className="flex flex-wrap gap-2.5 border-t border-border pt-4">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-[20px] border border-muted px-2 py-1.5 text-micro text-muted uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
