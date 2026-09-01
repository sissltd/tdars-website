import { cn } from "@/lib/cn";

/*
  The numbered card used twice on Home: white on the dark "How it works" panel
  (home-web3) and outlined on white under "Prepare with TDARS Mock Exam" (home-web5).

  Both frames park the numeral at the top and the title + copy at the bottom with a
  deliberate void between, so the card is a `justify-between` column.
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
        "flex h-full min-h-52 flex-col justify-between gap-10 rounded-md bg-surface p-5",
        tone === "outline" && "border border-border",
      )}
    >
      <span aria-hidden="true" className="font-heading text-2xl font-semibold text-muted">
        {number}
      </span>

      <div>
        <h4 className="text-base font-semibold text-heading">{title}</h4>
        <p className="mt-2 text-base leading-relaxed text-body lg:text-sm lg:leading-normal">
          {description}
        </p>
      </div>
    </li>
  );
}
