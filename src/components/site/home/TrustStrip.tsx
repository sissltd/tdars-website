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
        <ul className="grid grid-cols-[auto_auto_1fr] gap-x-6 gap-y-8 lg:h-24 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-border">
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
