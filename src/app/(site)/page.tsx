import { Section } from "@/components/site/Section";
import { AccessControls } from "@/components/site/home/AccessControls";
import { Audiences } from "@/components/site/home/Audiences";
import { Hero } from "@/components/site/home/Hero";
import { HowItWorks } from "@/components/site/home/HowItWorks";
import { MockExamsCbt } from "@/components/site/home/MockExamsCbt";
import { ReadyToGoDigital } from "@/components/site/home/ReadyToGoDigital";
import { Solutions } from "@/components/site/home/Solutions";
import { StillOnPaper } from "@/components/site/home/StillOnPaper";
import { TrustStrip } from "@/components/site/home/TrustStrip";

/*
  Home — design/site/web/home-web1…9.png and design/site/mobile/home-mobile1…18.png.
  (home-mobile19-21 are the footer, which the shared shell already renders.)

  Metadata lives in src/app/layout.tsx: its defaults — title, description, canonical
  "/", OpenGraph — are written for this page, so overriding them here would only
  restate them.

  <TrustStrip> is the one section that brings its own <section> rather than sitting in
  a <Section>: it is a 105px band closing the hero, and <Section>'s 56/80/96px rhythm
  would triple its height.
*/
export default function HomePage() {
  return (
    <>
      <Section bleed aria-labelledby="hero-title" className="overflow-hidden bg-hero">
        <Hero />
      </Section>

      <TrustStrip />

      <Section id="solutions" aria-labelledby="solutions-title">
        <Solutions />
      </Section>

      <Section aria-labelledby="how-it-works-title">
        <HowItWorks />
      </Section>

      <Section aria-labelledby="mock-exams-title">
        <MockExamsCbt />
      </Section>

      {/* web6 and web7 both sample #FAFAFA — one continuous band, two sections. */}
      <Section tone="subtle" aria-labelledby="audiences-title">
        <Audiences />
      </Section>

      <Section tone="subtle" aria-labelledby="access-controls-title">
        <AccessControls />
      </Section>

      <Section tone="dark" aria-labelledby="still-on-paper-title">
        <StillOnPaper />
      </Section>

      <Section aria-labelledby="ready-title">
        <ReadyToGoDigital />
      </Section>
    </>
  );
}
