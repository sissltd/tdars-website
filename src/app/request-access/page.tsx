import type { Metadata } from "next";

import { RequestAccessForm } from "@/components/site/request-access/RequestAccessForm";

export const metadata: Metadata = {
  title: "Request access",
  description:
    "Tell us about your organisation and we'll get back to you within 2 business days.",
  alternates: { canonical: "/request-access" },
};

/*
  design/site/web/home-web-request-access.png
  design/site/mobile/home-mobile-request-access.png

  Deliberately OUTSIDE the `(site)` group: the frame has no header and no footer.
  It is a single centred card on an otherwise empty page, and "Close" is the only
  way back — which is why it is a link to Home rather than a nav.

  The card is measured: Hug 684 wide, 32px padding, 12px radius. It is white on
  white, so the hairline is what separates it from the page. Full-bleed below
  `sm` — a fixed 684 card on a 375 phone would simply overflow, and the mobile
  frame runs the form to the edges.
*/
export default function RequestAccessPage() {
  return (
    /*
      The card lives INSIDE the form component, not here: on success the form is
      replaced by a standalone 369px card, and that card must not inherit the
      684px bordered box the form sits in — otherwise it renders as a small card
      floating inside a large empty one.
    */
    <main className="flex min-h-dvh justify-center px-5 py-12 md:py-20">
      <RequestAccessForm />
    </main>
  );
}
