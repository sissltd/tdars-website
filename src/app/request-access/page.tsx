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
    <main className="flex min-h-dvh justify-center px-5 py-12 md:py-20">
      <div className="w-full max-w-[684px] rounded-md border-border bg-surface sm:border sm:p-8">
        <RequestAccessForm />
      </div>
    </main>
  );
}
