import type { Metadata } from "next";

import { ReadyToGoDigital } from "@/components/site/ReadyToGoDigital";
import { Section } from "@/components/site/Section";
import { LegalDocument } from "@/components/site/legal/LegalDocument";
import { TERMS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms governing your organisation's access to and use of the TDARS Digital Archive System.",
  alternates: { canonical: "/terms" },
};

/* design/site/web/home-web-T&C1..5.png · design/site/mobile/home-mobile-T&C1..9.png */
export default function TermsPage() {
  return (
    <>
      {/* `#top` is the "Back to Top" target in the contents rail. */}
      <Section reveal="load" id="top" className="pt-10 md:pt-14 lg:pt-16">
        <LegalDocument document={TERMS} />
      </Section>

      <Section aria-labelledby="ready-title" className="pt-0">
        <ReadyToGoDigital />
      </Section>
    </>
  );
}
