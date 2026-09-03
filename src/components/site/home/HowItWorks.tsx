import { Badge } from "@/components/site/Badge";
import { StepCard } from "./StepCard";

/*
  design/site/web/home-web3.png · design/site/mobile/home-mobile5-6.png

  Measured off the frame:
    Section   Fill 1440 x Hug 843 · padding 80        (mobile: 390 · padding 40 / 12)
    Panel     FIXED 1280 x Hug 683 · #2D2D2D · radius 40
              padding 96 top/bottom, 80 left/right
              (mobile: Fill 366 x Hug 958 · padding 12 left/right)
    Column    Fill 1120 x Hug 491 · gap 60
    Header    FIXED 720 x Hug 200 · gap 20            (mobile: Fill 342 x Hug 180)
      Eyebrow  124 x 32 · radius 26 · 1px #E28D83 on #FAECEA   (mobile 111 x 28)
      H2       720 x 88 (2 lines/44) — H2/BOLD, Gray/Gray 5 #FAFAFA
      Body     720 x 48 (2 lines/24) — Body 1/MEDIUM, ALSO #FAFAFA
    Step grid Fill 1120 x Hug 231 · gap 24            (mobile: Fill 342 · gap 24 vertical)

  Note the description is #FAFAFA, the same near-white as the heading — not a
  dimmed white. It was `text-white/70`, which read as noticeably greyer.

  ⚠️ INFERRED, not measured: the mobile panel's vertical padding and the gap under
  its header. The frame only pins the total — 958 - 180 header - 698 grid = 80px to
  split between two paddings and one gap. 28/24/28 matches the screenshot; the
  inspector never showed those three values individually. Same for the mobile
  radius (desktop's 40 is explicit, mobile's is not).
*/
const STEPS = [
  {
    number: "01",
    title: "Capture",
    description: "Scan, upload, or import from email and USB. TDARS handles the rest.",
  },
  {
    number: "02",
    title: "Recognise",
    description: "Reads text from scans, classifies each document, and flags anomalies.",
  },
  {
    number: "03",
    title: "Link",
    description: "Matches documents to the right person using names, IDs, and biometrics.",
  },
  {
    number: "04",
    title: "Store securely",
    description:
      "Records are encrypted and stored and controlled. Nothing gets lost, nothing gets leaked.",
  },
];

export function HowItWorks() {
  return (
    <div className="relative isolate overflow-hidden rounded-lg bg-dark-panel px-3 py-7 lg:rounded-[40px] lg:px-20 lg:py-24">
      {/*
        The panel is not flat — it carries a faint square grid with a handful of
        slightly lighter cells, and a large soft render bled across it.

        Both are Yemi's exports, drawn as CSS backgrounds rather than next/image:
        they are purely decorative, must not enter the accessibility tree, and
        never need to be measured or lazy-loaded independently of the panel.

        ⚠️ Do NOT add `opacity-5` here to match the frame's 5%. Figma BAKES a
        layer's opacity into its export: the render's mean alpha is already 13/255
        (~5%), and the pattern's ~9%. Applying 5% again multiplied out to 0.25%
        and the render vanished entirely — which is exactly what happened first
        time round. The panel is dark, so a faint light shape is easy to mistake
        for "not loading" rather than "loaded and drawn twice as faint".

        ⚠️ Neither layer can be placed exactly, because both exports are CROPS
        with a different aspect ratio from the layer they came from:

            render   exported 658 x 573 (1.15)  ·  frame layer 1384 x 776 (1.78)
            pattern  exported 775 x 565 (1.37)  ·  frame layer  768 x 768 (1.00)

        The frame positions each layer by size and offset against a 1280 x 683
        panel, and those coordinates cannot be mapped onto a crop of unknown
        origin. Both are sized by HEIGHT to the panel and anchored to opposite
        edges. Bleeding them past the panel (112% / 114%, matching the frame's
        oversized layers) was TRIED AND REVERTED — it is closer on paper but
        looks worse, because enlarging a crop pushes what little content it has
        out of view. Leave them at 100%.

        To make this exact, re-export ONE flattened decorative layer at the
        panel's own size.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/home/background-pattern-decorative.png')] bg-[length:auto_100%] bg-left bg-no-repeat"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/home/abstract-shape-render-1.png')] bg-[length:auto_100%] bg-right bg-no-repeat"
      />

      <div className="lg:flex lg:flex-col lg:gap-15">
        <header className="flex flex-col gap-5 lg:max-w-[720px]">
          <Badge className="self-start">How it works</Badge>

          <h2
            id="how-it-works-title"
            className="font-heading text-h2 font-bold text-footer-foreground lg:text-h2-lg"
          >
            From paper to secure digital archive in four simple steps
          </h2>

          <p className="text-sm leading-5 font-medium text-footer-foreground lg:text-base lg:leading-6">
            TDARS handles the heavy lifting, scanning, classifying, linking, and storing, so
            your team can focus on the work that matters.
          </p>
        </header>

        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-0 lg:grid-cols-4">
          {STEPS.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </ul>
      </div>
    </div>
  );
}
