import type { ComponentType, SVGProps } from "react";

import { Container } from "@/components/site/Container";
import { cn } from "@/lib/cn";
import { CloudNodeIcon, LayersIcon, RecordLinesIcon } from "./icons";

/*
  design/site/web/home-web1.png (band) · design/site/mobile/home-mobile3.png

  A 105px #FAFAFA band closing the hero — too tight for <Section>'s 56/80/96px
  rhythm, so it renders its own <section>. Desktop is four cells split by hairlines,
  each with 16px of inner padding (the frame's first label sits at x = 96 = the 80px
  gutter + 16). Mobile drops the rules and puts the first cell on its own row.
*/
type TrustItem = {
  label: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

const TRUST_ITEMS: TrustItem[] = [
  { label: "Designed for controlled environments" },
  { label: "Tenant-isolated", Icon: LayersIcon },
  { label: "Auditable", Icon: RecordLinesIcon },
  { label: "Cloud / on-premises / air-gapped", Icon: CloudNodeIcon },
];

export function TrustStrip() {
  return (
    <section aria-label="Why teams trust TDARS" className="bg-surface-subtle py-6 lg:py-7">
      <Container>
        {/* Mobile columns hug their labels so "Cloud / on-premises / air-gapped" keeps
            the two lines the frame gives it; desktop is four even cells. */}
        <ul className="grid grid-cols-[auto_auto_1fr] gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-border">
          {TRUST_ITEMS.map(({ label, Icon }, index) => (
            <li
              key={label}
              className={cn(
                "flex flex-col justify-center gap-3.5 lg:px-4",
                index === 0 && "col-span-3 lg:col-span-1",
              )}
            >
              {Icon ? <Icon className="size-6 text-heading" /> : null}
              <span className="text-sm font-medium text-heading">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
