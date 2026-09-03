import type { Metadata } from "next";

import { ReadyToGoDigital } from "@/components/site/ReadyToGoDigital";
import { Section } from "@/components/site/Section";
import { LegalDocument } from "@/components/site/legal/LegalDocument";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What TDARS collects from organisations, administrators, and users, how we use it, and the choices you have.",
  alternates: { canonical: "/privacy" },
};

/* design/site/web/home-web-privacy-policy1..4.png · design/site/mobile/home-mobile-privacy1..5.png */
export default function PrivacyPage() {
  return (
    <>
      {/* `#top` is the "Back to Top" target in the contents rail. */}
      <Section reveal="load" id="top" className="pt-10 md:pt-14 lg:pt-16">
        <LegalDocument document={PRIVACY} />
      </Section>

      <Section aria-labelledby="ready-title" className="pt-0">
        <ReadyToGoDigital />
      </Section>
    </>
  );
}
