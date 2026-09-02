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
    <div className="mx-auto flex max-w-site flex-col gap-10 pl-4 md:pl-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:pl-20">
      <div className="pr-4 md:pr-10 lg:pr-0">
        <h1
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

        <p className="mt-5 max-w-xl text-base leading-relaxed text-body lg:mt-6">
          Digitize, manage and retrieve your records, run examination practices and
          conduct computer based examinations - all through TDARS
        </p>

        {/*
          TODO(review): the Figma has no destination for "Get Started". The site is
          static (no API), so the form GETs the email over to /request-access — the
          same place the nav CTA points — rather than dead-ending on a button that
          does nothing. Say the word if it should post somewhere instead.
        */}
        <form
          action={REQUEST_ACCESS_HREF}
          method="get"
          className="mt-8 max-w-xl lg:mt-10"
        >
          <label htmlFor="hero-email" className="block text-sm text-body">
            Enter your work email to get started
            <span aria-hidden="true" className="text-primary">
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
            <Button type="submit" size="md" fullWidth className="px-8 sm:w-auto lg:h-12">
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
      <div>
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
