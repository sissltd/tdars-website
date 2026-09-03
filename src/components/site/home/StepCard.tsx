import { cn } from "@/lib/cn";

/*
  The numbered card used twice on Home: white on the dark "How it works" panel
  (home-web3) and outlined on white under "Prepare with TDARS Mock Exam" (home-web5).

  Measured off the "How it works" frame:
    Card      Fill 262 x FIXED 231 · radius 12 · 1px #E6E6E6 · padding 20 · space-between
              (mobile: Fill 342 x FIXED 157 · padding 12)
    Numeral   30 x 38 desktop, 21 x 26 mobile — H3/BOLD, Gray/Gray 3 #999999
    Title     64 x 24 desktop, 56 x 20 mobile — Body 1/BOLD, Gray/Gray 1 #373737
    Body      222 x 60 desktop (3 lines/20), 318 x 36 mobile (2 lines/18)
              — Body 2/Regular, Gray/Gray 2 #4D4D4D

  Both frames park the numeral at the top and the title + copy at the bottom with a
  deliberate void between, so the card is a `justify-between` column.

  The `outline` tone is measured off "Prepare with TDARS Mock Exam":
    Card      Fill 302 x FIXED 231 · padding 20   (mobile: Fill 358 x FIXED 162 · padding 20)

  Note the two tones DIFFER on mobile — 157 tall at 12px padding on the dark
  panel, 162 at 20px here — so they cannot share one set of classes.
*/
type StepCardProps = {
  number: string;
  title: string;
  description: string;
  /** `solid` = white card on the dark panel · `outline` = hairline card on white. */
  tone?: "solid" | "outline";
};

export function StepCard({ number, title, description, tone = "solid" }: StepCardProps) {
  return (
    <li
      className={cn(
        "flex flex-col justify-between rounded-md border lg:p-5",
        tone === "solid"
          // On the dark panel, so it takes the panel-relative surface: in dark
          // mode --surface is darker than the panel and the card would sink
          // into it rather than sitting on it.
          ? "h-[157px] border-panel-border bg-panel-surface p-3 lg:h-[231px]"
          : "h-[162px] border-border bg-surface p-5 lg:h-[231px]",
      )}
    >
      {/* H3/Bold — 18/26 mobile, 30/38 desktop. Not `--text-h3-lg` (20/28); see
          the note on `--text-h3-feature`, which this frame independently confirms. */}
      <span
        aria-hidden="true"
        className="font-heading text-h3 font-bold text-muted lg:text-h3-feature lg:font-bold"
      >
        {number}
      </span>

      <div>
        <h4 className="text-sm leading-5 font-bold text-heading lg:text-base lg:leading-6">
          {title}
        </h4>
        {/* 8px under the title in both frames. */}
        <p className="mt-2 text-xs leading-[18px] text-body lg:text-sm lg:leading-5">
          {description}
        </p>
      </div>
    </li>
  );
}
