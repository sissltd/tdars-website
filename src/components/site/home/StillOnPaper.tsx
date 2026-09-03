import Image from "next/image";

import { cn } from "@/lib/cn";

/*
  design/site/web/home-web8.png · design/site/mobile/home-mobile15-17.png

  Full-bleed #2D2D2D band, three columns split by hairlines on desktop and stacked on
  mobile.

  Measured off the frame:
    Section   Fill 1440 x Hug 946 · padding 80 · gap 60 · #2D2D2D
              border TOP 13px DASHED (4, 4) in Gray/Gray 3 #999999
              (mobile: 390 · padding 40/16 · gap 60)
    Header    FIXED 720 x Hug 156 · gap 20
      H2        720 x 88 — H2/Bold, Grey/5 #FCFCFC
      Body      720 x 48 — Body 1/Medium, Gray/Gray 5 #FAFAFA
    Row       Fill 1280 x FIXED 570 · three columns of 426.67, no gap
    Column    border TOP 1px + RIGHT 1px Grey/3 #D9D9D9 · padding 40/32 · gap 40
      text      Fill 362.67 x Hug 113 · gap 11
      title     H6/Semibold — INTER 600 20/30, Grey/5
      body      Subheading/Regular — Inter 400 16/24, Grey/4 #F9F9F9
    Media     radius 16 · 1px Grey/4 · #F6F6F6, filling the column's remaining height

  Three near-whites sit within 3/255 of each other here and Figma names them all
  separately — see the note beside `--grey-4` in globals.css.

  The column type does NOT scale down on mobile: 20/30 and 16/24 at both sizes.

  The three media cards are Yemi's exports at 2x, background and 1px border baked
  in — so they are placed whole rather than rebuilt. The hand-drawn stand-ins they
  replace could not carry the intake sheet's navy/gold accents or its microcopy.
*/
const PILLARS = [
  {
    slug: "capture",
    title: "Capture from anywhere",
    description:
      "Scan paper files, upload documents, or pull from email — everything lands in one secure, searchable archive.",
    // The frame's own card sizes at 2x. The first column's text runs to three
    // lines, so its card is shorter than the other two.
    desktop: { width: 726, height: 674 },
    mobile: { width: 668, height: 424 },
  },
  {
    slug: "processing",
    title: "Smart processing",
    description:
      "Documents are automatically sorted, indexed, and routed to the right person for review.",
    desktop: { width: 726, height: 722 },
    mobile: { width: 668, height: 424 },
  },
  {
    slug: "search",
    title: "Find it fast",
    description:
      "Search across your entire archive instantly. Permissions and audit trails stay intact.",
    desktop: { width: 726, height: 722 },
    mobile: { width: 668, height: 472 },
  },
];

export function StillOnPaper() {
  return (
    <div className="flex flex-col gap-15">
      <header className="flex flex-col gap-5 lg:max-w-[720px]">
        <h2
          id="still-on-paper-title"
          className="font-heading text-h2 font-bold text-grey-5 lg:text-h2-lg"
        >
          Still running on paper? Now you found a better way.
        </h2>

        <p className="text-sm leading-5 font-medium text-gray-5 lg:text-base lg:leading-6">
          Government agencies, security institutions, and large organisations lose time,
          money, and trust when records live in filing cabinets and spreadsheets. TDARS
          changes that.
        </p>
      </header>

      {/* No gap between columns — the 1px right rules ARE the dividers. */}
      <ul className="lg:grid lg:grid-cols-3">
        {PILLARS.map(({ slug, title, description, desktop, mobile }, index) => (
          <li
            key={slug}
            className={cn(
              "flex flex-col gap-10 px-3 py-10 lg:border-t lg:border-divider lg:px-8",
              // Stacked, the first column opens the list and needs no rule above it.
              index === 0 ? "pt-0 lg:pt-10" : "border-t border-divider",
              index < PILLARS.length - 1 && "lg:border-r lg:border-r-divider",
            )}
          >
            <div className="flex flex-col gap-[11px]">
              {/* H6 — Inter 600, NOT the Bricolage `font-heading` used elsewhere. */}
              <h3 className="text-h6 text-grey-5">{title}</h3>
              <p className="text-base leading-6 text-grey-4">{description}</p>
            </div>

            {/* `mt-auto` bottom-aligns the cards, so their differing heights fall
                out of the frame's fixed 570 row rather than being hardcoded. */}
            <div className="mt-auto">
              <Image
                src={`/images/home/still-running/${slug}-mobile.png`}
                alt=""
                width={mobile.width}
                height={mobile.height}
                className="w-full lg:hidden"
              />
              <Image
                src={`/images/home/still-running/${slug}-desktop.png`}
                alt=""
                width={desktop.width}
                height={desktop.height}
                className="hidden w-full lg:block"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
