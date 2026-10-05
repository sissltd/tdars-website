import Image from "next/image";

import { Badge } from "@/components/site/Badge";
import { AUDIENCE_TILES } from "@/content/individual";

/*
  design/site/individual/04-who1.png … 06-who3.png

  Measured:
    Section  1440 x 805 · padding 80
    Grid     1166 x 645 · #FDFEFD · 7 columns x 4 rows of hairline cells
    Photo    149 x 146 inside its cell, label bottom-left in white Caption
    Copy     spans columns 1–4 of rows 3–4: eyebrow + H2 (3 lines)

  Desktop only for the grid; below lg the photos collapse to a 2-up strip under the
  heading so the faces stay readable at 390px.

  Photos: public/images/individual/audience/<slug>.jpg (298 x 292, 2x the tile). The
  label is BAKED INTO each export, so it is the alt text, not an overlay.
*/
export function WhoItsFor() {
  return (
    <div className="mx-auto max-w-[1166px]">
      {/* Mobile / tablet */}
      <div className="lg:hidden">
        <Heading />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AUDIENCE_TILES.map((tile) => (
            <li key={tile.slug}>
              <Photo label={tile.label} slug={tile.slug} />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: the 7 x 4 grid */}
      <div className="relative hidden grid-cols-7 grid-rows-4 border-t border-l border-border bg-surface lg:grid">
        {Array.from({ length: 28 }, (_, i) => (
          <span key={i} aria-hidden="true" className="aspect-[166.6/161] border-r border-b border-border" />
        ))}
        <div className="absolute flex flex-col justify-center gap-4 border-r border-b border-border bg-surface px-6" style={{ left: 0, top: "50%", width: "calc(4 / 7 * 100%)", height: "50%" }}>
          <Heading />
        </div>
        {AUDIENCE_TILES.map((tile) => (
          <div
            key={tile.slug}
            className="absolute p-2"
            style={{
              left: `calc(${tile.col - 1} / 7 * 100%)`,
              top: `calc(${tile.row - 1} / 4 * 100%)`,
              width: "calc(100% / 7)",
              height: "25%",
            }}
          >
            <Photo label={tile.label} slug={tile.slug} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Heading() {
  return (
    <>
      <Badge className="self-start">Who it&apos;s for</Badge>
      <h2 id="who-title" className="mt-4 font-heading text-h2 text-heading lg:mt-0 lg:max-w-[400px] lg:text-h2-lg">
        Whatever you&apos;re preparing for, practise with purpose.
      </h2>
    </>
  );
}

function Photo({ label, slug }: { label: string; slug: string }) {
  return (
    <div className="relative aspect-[149/146] h-full w-full overflow-hidden rounded-sm bg-surface-subtle">
      <Image
        src={`/images/individual/audience/${slug}.jpg`}
        alt={label}
        fill
        sizes="(min-width: 1024px) 150px, (min-width: 640px) 25vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
