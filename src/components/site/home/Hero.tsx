import Image from "next/image";

import { Button } from "@/components/site/Button";
import { REQUEST_ACCESS_HREF } from "@/components/site/nav-links";

/*
  design/site/web/home-web1.png · design/site/mobile/home-mobile2.png

  The hero has no right gutter: at 1440 the mock-up measures 601px wide starting at
  x = 838, i.e. it lands flush on the viewport edge (80 gutter + 600 copy + 158 gap +
  602 image = 1440). So the wrapper carries left padding only and the image column
  runs to the edge at both breakpoints — the frame's mobile crop does the same thing.
*/
export function Hero() {
  return (
    <div
      /*
        `lg:items-start`, and the copy takes its own top offset below.

        Yemi's frame gives the two columns DIFFERENT offsets from the hero top:
        the image at 77px, the headline at 120px. Centring cannot express that —
        it derives one from the other — and every attempt to force it either
        pushed the copy down or pulled the image into the navbar.

        Top-aligning makes the two independent: the section's padding sets the
        image gap, `lg:pt-10` below sets the extra 40px on the copy.
      */
      /*
        ⚠️ `lg:gap-28` (112px), NOT the 56px it was — the centre rule in
        page.tsx depends on it, and the arithmetic is not obvious.

        The hero has LEFT padding only (80px, no right gutter), so with two
        equal columns:

            copy column right edge = W/2 + 40 - gap/2
            the rule sits at       = W/2                  (the viewport centre)
            clearance              = gap/2 - 40

        Clearance does not vary with viewport width — it is a property of the
        gap alone. At 56px it was MINUS 12, so the rule sat 12px inside the copy
        column at every size, cutting through the headline on anything below
        ~1374px. Any gap under 80px does that; it is not a small-screen bug.

        The frame's own gap is 158px, which would give its designed 39px of
        clearance. It is unreachable here: that leaves a 601px column, and our
        headline's longest line measures 607px at 60px Bricolage where the frame
        assumes 587 — so it would drop to four lines and lose the break Yemi drew.

        Between the headline's 607px and the rule at 720 there are only 33px to
        spend, and they have to cover BOTH the clearance and the headline's
        safety margin. 112px splits them evenly: 16px of clearance, 17px before
        the headline wraps. Raising this toward 158 buys clearance out of that
        margin — 128px is the most that still leaves any.
      */
      className="mx-auto flex max-w-site flex-col gap-10 pl-4 md:pl-10 lg:grid lg:grid-cols-2 lg:items-start lg:gap-28 lg:pl-20"
    >
      {/*
        +40px on the COPY ONLY. Section padding (80) + this (40) = 120 below the
        header, which is where Yemi's headline sits. The image keeps the 80.
      */}
      <div className="pr-4 md:pr-10 lg:pt-10 lg:pr-0">
        {/*
          Animated on LOAD via CSS, not on scroll via JS — see `data-enter` in
          globals.css. The heading takes NO delay: it is the LCP candidate, and
          an element held at opacity 0 through a delay does not count as painted.
        */}
        <h1
          data-enter="left"
          id="hero-title"
          /*
            587 x 216 — three lines at the 72px H1 line, breaking after
            "Platform" and after "Record".

            The breaks are EXPLICIT rather than left to the box width. Figma
            exposes H1/fontSize as a variable, not a number, and our 60px renders
            wider than the frame does: at 587px it broke into four lines, and at
            672px it pulled "That" up and stranded "Matters". Guessing the size
            to make the wrap land correctly is how that ping-pongs. A `<br>` that
            only exists from `lg` pins the desktop break exactly as drawn and
            leaves mobile to flow, where the frame gives it 358px and two lines.

            The width is generous enough that the longest line never wraps on its
            own; the breaks, not the box, do the work.
          */
          className="max-w-xl font-heading text-h1 text-heading lg:max-w-[680px] lg:text-h1-lg"
        >
          One Secure Platform
          <br className="hidden lg:inline" /> for Every Record
          <br className="hidden lg:inline" /> That Matters
        </h1>
        <p
          data-enter="left"
          style={{ "--enter-delay": "80ms" } as React.CSSProperties}
          className="mt-5 max-w-xl text-base leading-relaxed text-body lg:mt-6"
        >
          Digitize, manage and retrieve your records, run examination practices
          and conduct computer based examinations - all through TDARS
        </p>

        {/*
          The Figma gives "Get Started" no destination. It is NOT a separate
          lead capture: it GETs the address over to /request-access — where the
          nav CTA also points — and that form reads `?email=` and fills its own
          Work Email field in. So this is the first field of the access request,
          asked early because one input converts better than a seven-field form,
          and it needs no endpoint of its own.

          ⚠️ If it is ever made a standalone capture instead, an email with no
          organisation, size or modules cannot be actioned by whoever answers
          within the promised 2 business days — they would have to write back
          asking exactly what the form already asks. That is a product decision
          with a consent question attached, not a wiring change.
        */}
        <form
          data-enter="left"
          style={{ "--enter-delay": "160ms" } as React.CSSProperties}
          action={REQUEST_ACCESS_HREF}
          method="get"
          className="mt-8 max-w-xl lg:mt-10"
        >
          <label htmlFor="hero-email" className="block text-sm text-body">
            Enter your work email to get started
            <span aria-hidden="true" className="text-accent">
              {" "}
              *
            </span>
          </label>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="hero-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="yemi@workforce.co"
              className="h-11 w-full rounded-md border border-border bg-surface px-4 text-sm text-heading placeholder:text-muted sm:flex-1 lg:h-12"
            />
            <Button
              type="submit"
              size="md"
              fullWidth
              className="px-8 sm:w-auto lg:h-12"
            >
              Get Started
            </Button>
          </div>
        </form>
      </div>

      {/*
        TODO(review): two crops of the same dashboard ship here (the mobile one is a
        wider, shallower art-direction crop), so both download on every visit. One
        responsive asset would be ~60KB lighter — happy to switch if you can export a
        single frame.
      */}
      {/*
        Full-bleed RIGHT from `lg` up — Yemi, 07/09. Mobile already reaches the
        edge because the container has no right padding there.

        The container is `max-w-site` and centred, so on a viewport wider than
        1440 it leaves (100vw - 1440) / 2 of dead space on the right. A negative
        margin of exactly that pulls the image out to the edge.

        `min(0px, …)` is the guard: below 1440 the expression turns POSITIVE,
        which would indent the image instead of bleeding it. Clamping at 0 makes
        the rule inert at narrow widths rather than actively wrong.

        The usual `calc(50% - 50vw)` trick does NOT work here — margin
        percentages resolve against the containing block, which is the grid
        COLUMN (~650px), not the container. It would pull ~465px too far.

        Safe against horizontal scroll: the section is `overflow-hidden`.
      */}
      <div
        data-enter="right"
        style={{ "--enter-delay": "120ms" } as React.CSSProperties}
        className="lg:mr-[min(0px,calc((var(--container-site)-100vw)/2))]"
      >
        <Image
          src="/images/hero-mobile.png"
          alt="The TDARS dashboard showing document ingest totals, an approval queue and live scanner status."
          width={753}
          height={579}
          preload
          sizes="100vw"
          className="h-auto w-full lg:hidden"
        />
        <Image
          src="/images/hero-desktop.png"
          alt="The TDARS dashboard showing document ingest totals, an approval queue and live scanner status."
          width={1203}
          height={1213}
          preload
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="hidden h-auto w-full lg:block"
        />
      </div>
    </div>
  );
}
