import { Badge } from "./Badge";
import { Button } from "./Button";
import { WaveTexture } from "@/components/site/icons";

/*
  design/site/web/home-web9.png · home-web-Blog-page3.png
  design/site/mobile/home-mobile17-18.png

  Measured off the CTA frame:
    Section   Fill 1440 · padding 80
    Card      1280 x 438 · radius 54 · 1px #334155 · fill Primary/Primary 1
    Eyebrow   Hug 90 x 26 · radius 12 · padding 4/12 · Gray/Gray 1 (#373737)
    Heading   566 x 72 · H1/Bold (60/72) · #F8FAFC
    Body      640 x 60 · H5/Medium — Bricolage 500 · Primary/Primary 4 (#FAECEA)
    Button    Fixed 298 x 48 · radius 12 · padding 12/24 · Primary/Primary 5

  The heading was on `--text-display` (54/60); the frame is H1 (60/72), which the
  ramp already had. The supporting line is H5/MEDIUM in the DISPLAY face, not
  body copy — that 500 weight is what stops it reading as a paragraph.
*/

export function ReadyToGoDigital() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-cta-border bg-primary px-6 py-14 text-center lg:rounded-2xl lg:py-20">
      <WaveTexture />

      {/* Above the texture. */}
      <div className="relative">
        <Badge tone="dark" shape="rect">Get started</Badge>

        <h2
          id="ready-title"
          className="mt-6 font-heading text-h1 text-primary-foreground lg:text-h1-lg"
        >
          Ready to go digital?
        </h2>

        <p className="mx-auto mt-4 max-w-[640px] font-heading text-base font-medium text-on-rust-body lg:text-h5">
          Replace paper files and scattered spreadsheets with a secure, searchable
          archive your whole organisation can trust.
        </p>

        <Button
          href="/#contact"
          variant="wash"
          size="lg"
          className="mt-8 w-full max-w-[298px]"
        >
          Talk to our team
        </Button>
      </div>
    </div>
  );
}
