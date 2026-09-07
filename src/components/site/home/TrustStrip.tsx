import type { ComponentType, SVGProps } from "react";

import { Container } from "@/components/site/Container";
import { cn } from "@/lib/cn";
import {
  AuditableIcon,
  CloudDeploymentIcon,
  TenantIsolatedIcon,
} from "@/components/site/icons";

/*
  design/site/web/home-web1.png (band) · design/site/mobile/home-mobile3.png

  Measured: the band is 1440 x 112 with only **8px** of vertical padding and a
  #FAFAFA (Gray/Gray 5) fill; each cell is Fill 279.5 x **96** with a 1px
  #E6E6E6 rule on its right.

  Those two numbers are why the hairlines nearly touch the band's edges — 8px of
  clearance top and bottom, no more. Earlier padding of 24/28px left the rules
  looking short and floating in the middle of the band.

  Labels are Body 2/Semi Bold (Inter 600) in Gray/Gray 2, not the heading grey.
  Mobile drops the rules and puts the first cell on its own row.
*/
type TrustItem = {
  label: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

const TRUST_ITEMS: TrustItem[] = [
  { label: "Designed for controlled environments" },
  { label: "Tenant-isolated", Icon: TenantIsolatedIcon },
  { label: "Auditable", Icon: AuditableIcon },
  { label: "Cloud / on-premises / air-gapped", Icon: CloudDeploymentIcon },
];

export function TrustStrip() {
  return (
    /* In the first screen, so it enters on LOAD in CSS rather than waiting for
       the observer. Last in the hero's stagger. */
    <section
      data-enter="up"
      style={{ "--enter-delay": "240ms" } as React.CSSProperties}
      aria-label="Why teams trust TDARS"
      className="bg-gray-5 py-6 lg:py-2"
    >
      <Container>
        {/* Mobile columns hug their labels so "Cloud / on-premises / air-gapped" keeps
            the two lines the frame gives it; desktop is four even cells. */}
        {/*
          ⚠️ The desktop cells are NOT four equal columns, and they must not be.

          The frame makes the first cell narrower than the other three — it is a
          label, where the rest are icon + feature — and that is what places the
          middle separator to the LEFT of the hero rule above, rather than under
          it. Measured off the frame at 1440 (content 1280): 275 / 334 / 334 /
          337, so the last three are one width and the first is ~60px short of
          it. Modelled here as 275 + 3x335, which puts the three borders at
          355 / 690 / 1025 against the 355 / 689 / 1023 measured — and the middle
          one 30px left of the rule at 720, which is the offset the frame shows.
          `fr` rather than px so the proportion holds below 1440.

          ⚠️ `lg:gap-x-0` matters too: the mobile `gap-x-6` had no `lg:` override,
          and `divide-x` draws each border on the LEFT EDGE of the next cell —
          the far side of the gap, not down its middle. A gap of `g` therefore
          shifts every border right by `g/2` on top of the column maths, which is
          not something the frame has. Closing it also makes the space around
          each border symmetric (the cells' own `lg:px-4` on both sides, where
          before it was 24px left and 16px right).

          Mobile keeps `gap-x-6` and its own `auto auto 1fr`: no dividers there,
          so the gap is what separates the columns.
        */}
        <ul className="grid grid-cols-[auto_auto_1fr] gap-x-6 gap-y-8 lg:h-24 lg:grid-cols-[275fr_335fr_335fr_335fr] lg:gap-x-0 lg:gap-y-0 lg:divide-x lg:divide-border">
          {TRUST_ITEMS.map(({ label, Icon }, index) => (
            <li
              key={label}
              className={cn(
                "flex flex-col justify-center gap-3.5 lg:px-4",
                index === 0 && "col-span-3 lg:col-span-1",
              )}
            >
              {Icon ? <Icon className="size-6 text-body" /> : null}
              <span
                className={cn(
                  "text-sm font-semibold leading-5 text-body",
                  // The frame gives this label a 166px text box (166 x 40), which
                  // is what breaks it over two lines. The cell is 279.5 wide, so
                  // without the cap it sits on one line and reads longer than
                  // every other label in the row.
                  index === 0 && "lg:block lg:max-w-[166px]",
                )}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
