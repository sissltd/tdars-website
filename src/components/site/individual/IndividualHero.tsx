import Image from "next/image";

import { AudienceToggle } from "@/components/site/AudienceToggle";
import { Button } from "@/components/site/Button";
import { INDIVIDUAL_START_HREF } from "@/components/site/nav-links";

/*
  design/site/individual/02-landing-hero.png

  Same two-column skeleton as the Organizations hero (left copy, right mock-up
  bleeding to the viewport edge) so the toggle swaps content, not layout.

  The email form GETs to the app's sign-up screen with `?email=` — that screen is a
  single email field ("Sign up or Log in"), so it can prefill and continue.
*/
export function IndividualHero() {
  return (
    <div className="mx-auto flex max-w-site flex-col gap-10 pl-4 md:pl-10 lg:grid lg:grid-cols-2 lg:items-start lg:gap-28 lg:pl-20">
      <div className="pr-4 md:pr-10 lg:pt-12 lg:pr-0">
        <div data-enter="left" className="mb-6 flex justify-center lg:mb-8 lg:max-w-[440px]">
          <AudienceToggle active="Individual" />
        </div>

        <h1
          data-enter="left"
          id="hero-title"
          className="max-w-xl font-heading text-h1 text-heading lg:max-w-[680px] lg:text-h1-lg"
        >
          Prepare for your
          <br className="hidden lg:inline" /> next exam with
          <br className="hidden lg:inline" /> practice that works.
        </h1>
        <p
          data-enter="left"
          style={{ "--enter-delay": "80ms" } as React.CSSProperties}
          className="mt-5 max-w-xl text-base leading-relaxed text-body lg:mt-6"
        >
          Practice with realistic questions, build your confidence, track your progress, and discover
          where you need to improve all in one place.
        </p>

        <form
          data-enter="left"
          style={{ "--enter-delay": "160ms" } as React.CSSProperties}
          action={INDIVIDUAL_START_HREF}
          method="get"
          target="_blank"
          className="mt-8 max-w-xl lg:mt-10"
        >
          <label htmlFor="individual-email" className="block text-sm text-body">
            Enter your email to get started
            <span aria-hidden="true" className="text-accent">
              {" "}
              *
            </span>
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="individual-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="yemi@example.com"
              className="h-11 w-full rounded-md border border-border bg-surface px-4 text-sm text-heading placeholder:text-muted sm:flex-1 lg:h-12"
            />
            <Button type="submit" size="md" fullWidth className="px-8 sm:w-auto lg:h-12">
              Get Started
            </Button>
          </div>
        </form>
      </div>

      {/* Figma has no mobile variant: one image at every width, flush right like the frame. */}
      <div
        data-enter="right"
        style={{ "--enter-delay": "120ms" } as React.CSSProperties}
        className="lg:mt-5 lg:mr-[min(0px,calc((var(--container-site)-100vw)/2))]"
      >
        <Image
          src="/images/individual/hero-desktop.png"
          alt="The TDARS individual dashboard: mock exams taken, average score, recent attempts and recommended practice."
          width={673}
          height={607}
          preload
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="ml-auto h-auto w-full max-w-[673px]"
        />
      </div>
    </div>
  );
}
