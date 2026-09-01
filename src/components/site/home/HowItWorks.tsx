import { Badge } from "@/components/site/Badge";
import { StepCard } from "./StepCard";

/*
  design/site/web/home-web3.png · design/site/mobile/home-mobile5-6.png

  A #2D2D2D panel spanning the container width, radius ~36px at 1440 and ~20px on
  mobile. Inner padding measures ~72/96px desktop, ~16px mobile.

  TODO(review): the panel carries a faint grid with a handful of slightly lighter
  squares — an unexported Figma texture. It ships flat until that asset lands.
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
    <div className="rounded-lg bg-dark-panel px-4 py-6 lg:rounded-xl lg:px-18 lg:py-24">
      <Badge>How it works</Badge>

      <h2
        id="how-it-works-title"
        className="mt-5 max-w-2xl font-heading text-h2 text-white lg:text-h2-lg"
      >
        From paper to secure digital archive in four simple steps
      </h2>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
        TDARS handles the heavy lifting, scanning, classifying, linking, and storing, so
        your team can focus on the work that matters.
      </p>

      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {STEPS.map((step) => (
          <StepCard key={step.number} {...step} />
        ))}
      </ul>
    </div>
  );
}
