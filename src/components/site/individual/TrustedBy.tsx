import Image from "next/image";

import { Container } from "@/components/site/Container";
import { TRUSTED_ORGS } from "@/content/individual";

/*
  Yemi's trusted band (07/10/2026): 1440 x 112 · padding 8/80 · Gray 5 (#FAFAFA).
  The label is a STATIC 259 x 96 cell (padding 10, 1px Gray 4 right border); the logos
  scroll left continuously and slide UNDER it, so it sits above the track with the
  band's own fill. Gap between logos 54.

  The track renders the list twice (second copy aria-hidden) so the -50% animation
  loops without a jump. Hover pauses it; reduced motion stops it (globals.css).

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
        <div className="relative flex flex-col gap-4 lg:block lg:h-24">
          <p className="relative z-10 flex items-center bg-gray-5 text-sm font-semibold leading-5 text-body lg:absolute lg:inset-y-0 lg:left-0 lg:w-[259px] lg:border-r lg:border-border lg:p-[10px] lg:pr-[93px]">
            Trusted by over 30+ organizations
          </p>
          <div className="group overflow-hidden lg:flex lg:h-full lg:items-center">
            {/* Own band fill: the animated layer is isolated, so multiply needs grey inside it to drop the JPG white. */}
            <div className="flex w-max animate-marquee gap-[54px] bg-gray-5 group-hover:[animation-play-state:paused]">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1 || undefined}
                  className="flex shrink-0 items-center gap-[54px]"
                >
                  {TRUSTED_ORGS.map((org) => (
                    <li key={org.slug} className="flex shrink-0 items-center">
                      <Image
                        src={`/images/individual/logos/${org.slug}.jpg`}
                        alt={copy === 1 ? "" : org.name}
                        width={org.width}
                        height={org.height}
                        className="h-8 w-auto mix-blend-multiply dark:rounded-sm dark:mix-blend-normal"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
