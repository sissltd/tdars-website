import Image from "next/image";

import { Container } from "@/components/site/Container";
import { TRUSTED_ORGS } from "@/content/individual";

/*
  design/site/individual/03-trusted-band.png

  Band: 1440 x 112 · padding 8/80 · gap 54 · Gray 5 (#FAFAFA) — the same band as
  the Organizations trust strip, with a label cell, a rule, then the logo row.

  Logos are JPGs on white: multiply drops the white into the band in light mode;
  dark mode shows each on its own white chip (a transparent PNG/SVG would fix both).
*/
export function TrustedBy() {
  return (
    <section
      data-enter="up"
      style={{ "--enter-delay": "240ms" } as React.CSSProperties}
      aria-label="Organisations that trust TDARS"
      className="bg-gray-5 py-6 lg:py-2"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:h-24 lg:flex-row lg:items-center lg:gap-[54px]">
          <p className="text-sm font-semibold leading-5 text-body lg:w-[166px] lg:shrink-0">
            Trusted by over 30+ organizations
          </p>
          <span aria-hidden="true" className="hidden h-full w-px bg-border lg:block" />
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:flex lg:flex-1 lg:items-center lg:justify-between">
            {TRUSTED_ORGS.map((org) => (
              <li key={org.slug} className="flex items-center">
                <Image
                  src={`/images/individual/logos/${org.slug}.jpg`}
                  alt={org.name}
                  width={org.width}
                  height={org.height}
                  className="h-8 w-auto mix-blend-multiply dark:rounded-sm dark:mix-blend-normal"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
