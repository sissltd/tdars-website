import type { Metadata } from "next";

import { Button } from "@/components/site/Button";
import { ReadyToGoDigital } from "@/components/site/ReadyToGoDigital";
import { Section } from "@/components/site/Section";
import { IndividualHero } from "@/components/site/individual/IndividualHero";
import { PracticeLibrary } from "@/components/site/individual/PracticeLibrary";
import { PracticeModes } from "@/components/site/individual/PracticeModes";
import { TestYourself } from "@/components/site/individual/TestYourself";
import { TrustedBy } from "@/components/site/individual/TrustedBy";
import { WhoItsFor } from "@/components/site/individual/WhoItsFor";
import { INDIVIDUAL_START_HREF } from "@/components/site/nav-links";

/*
  Individual landing — Yemi's "Individual" tab (design/site/individual/01–18,
  05/10/2026). The Organizations tab is the existing home page at "/".

  Section order and padding follow the frames: hero, trusted band, who it's for,
  how it works (two practice modes), practice library, test yourself (dark band),
  the rust CTA, then the shared footer.
*/
export const metadata: Metadata = {
  title: "Exam practice for individuals",
  description:
    "Prepare for your next exam with realistic practice questions, timed mock exams and progress tracking — all in one place.",
  alternates: { canonical: "/individuals" },
};

export default function IndividualsPage() {
  return (
    <>
      <Section
        bleed
        reveal={false}
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-hero pt-6 pb-14 md:pt-8 md:pb-20 lg:pt-4 lg:pb-24"
      >
        {/* lg:pt-4 here + lg:pt-12 on the copy: the laptop top (66px into the image) lines up with the toggle, per Figma. */}
        {/* Centre rule, as on the Organizations hero — see the note in app/(site)/page.tsx. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border lg:block"
        />
        <IndividualHero />
      </Section>

      <TrustedBy />

      {/* 1440 x 805 = 645 grid + 80 + 80. */}
      <Section aria-labelledby="who-title" className="py-15 lg:py-20">
        <WhoItsFor />
      </Section>

      <Section
        id="how-it-works"
        aria-labelledby="how-it-works-title"
        className="py-10 lg:py-20"
        containerClassName="px-3 md:px-10 lg:px-20"
      >
        <PracticeModes />
      </Section>

      <Section aria-labelledby="library-title" className="py-10 lg:py-20">
        <PracticeLibrary />
      </Section>

      <Section tone="dark" aria-labelledby="test-title" className="dash-rule-top py-10 lg:py-20">
        <TestYourself />
      </Section>

      <Section aria-labelledby="ready-title" className="py-14 lg:py-20">
        <ReadyToGoDigital
          title={
            <>
              Your next exam starts
              <br className="hidden lg:inline" /> with preparation.
            </>
          }
          body="Don't wait until exam day to find out what you know. Practise questions, test yourself, understand your gaps, and improve your performance."
          actions={
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={INDIVIDUAL_START_HREF} external variant="wash" size="md" className="w-full sm:w-auto">
                Start Practising
              </Button>
              <Button
                href="#how-it-works"
                size="md"
                className="w-full border border-on-rust-body bg-transparent text-primary-foreground hover:bg-white/10 sm:w-auto"
              >
                Explore Mock Exams
              </Button>
            </div>
          }
        />
      </Section>
    </>
  );
}
