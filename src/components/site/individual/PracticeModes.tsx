import { Badge } from "@/components/site/Badge";
import { Button } from "@/components/site/Button";
import { ArrowRightIcon, CheckCircleIcon, ChevronRightIcon } from "@/components/site/icons";
import { INDIVIDUAL_START_HREF } from "@/components/site/nav-links";
import { cn } from "@/lib/cn";

/*
  design/site/individual/07-how1.png … 09-how3.png

  Measured:
    Section  1440 x Hug 1080 · padding 80
    Panel    Fill 1280 x Hug 920 · #2D2D2D (same panel as Organizations' How it works)
    Column   Fill 1120 x Hug 728 · gap 60 — header (eyebrow, H2, body) over two cards
    Cards    side by side, ~390 wide each in the frame:
      Quick Practice  white · green "Quick Practice" chip · rust subline
                      bottom band: answered / answered / Explain / … tiles, rust CTA
      Mock Exam       #3A3A3A · rust chip · white subline
                      bottom band: 2 rows x 10 progress bars, light CTA

  The two bottom-band illustrations are simple enough to draw in CSS, so they are
  built rather than exported — they then follow the theme.
*/
export function PracticeModes() {
  return (
    <div className="relative isolate overflow-hidden rounded-lg bg-dark-panel px-3 py-7 lg:rounded-[40px] lg:px-20 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/home/background-pattern-decorative.png')] bg-[length:auto_100%] bg-left bg-no-repeat"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/home/abstract-shape-render-1.png')] bg-[length:auto_100%] bg-right bg-no-repeat"
      />

      <div className="flex flex-col gap-8 lg:gap-15">
        <header className="flex flex-col gap-5 lg:max-w-[720px]">
          <Badge className="self-start">How it works</Badge>
          <h2 id="how-it-works-title" className="font-heading text-h2 font-bold text-footer-foreground lg:text-h2-lg">
            Choose how you want to practise.
          </h2>
          <p className="text-sm leading-5 font-medium text-footer-foreground lg:text-base lg:leading-6">
            Learn as you go, or test yourself under exam conditions. Both lead to the same place: being ready.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <ModeCard
            tone="light"
            chip="Quick Practice"
            bestFor="Best for learning and revision"
            title="Quick Practice"
            tagline="Learn as you practise."
            features={["Immediate answers", "Review explanations", "Strengthen weak areas"]}
            art={<AnswerTiles />}
            cta={
              <Button href={INDIVIDUAL_START_HREF} external fullWidth>
                Start Quick Practice
                <ArrowRightIcon className="size-4" />
              </Button>
            }
          />
          <ModeCard
            tone="dark"
            chip="Mock Exam"
            bestFor="Best for exam readiness"
            title="Mock Exam"
            tagline="Test yourself like it matters."
            features={["Full exam simulation", "Timed practice", "Performance breakdown"]}
            art={<ProgressBars />}
            cta={
              <Button href={INDIVIDUAL_START_HREF} external variant="wash" fullWidth>
                Take a Mock Exam
                <ChevronRightIcon className="size-4" />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

function ModeCard({
  tone,
  chip,
  bestFor,
  title,
  tagline,
  features,
  art,
  cta,
}: {
  tone: "light" | "dark";
  chip: string;
  bestFor: string;
  title: string;
  tagline: string;
  features: string[];
  art: React.ReactNode;
  cta: React.ReactNode;
}) {
  const light = tone === "light";
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-md",
        light ? "bg-panel-surface" : "bg-panel-card-dark",
      )}
    >
      <div className="flex min-h-[244px] flex-col gap-1 p-4 lg:min-h-[260px]">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium leading-4",
              light ? "bg-success-chip-bg text-success-chip" : "bg-surface text-accent",
            )}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
            {chip}
          </span>
          <span className={cn("text-[11px] leading-4", light ? "text-body" : "text-grey-4")}>{bestFor}</span>
        </div>
        <h3 className={cn("mt-2 font-heading text-h4 lg:text-h4-lg", light ? "text-heading" : "text-grey-5")}>
          {title}
        </h3>
        <p className={cn("text-sm leading-5", light ? "text-accent" : "text-grey-4")}>{tagline}</p>

        <ul className="mt-auto flex flex-wrap justify-center gap-x-4 gap-y-2 pt-8">
          {features.map((feature) => (
            <li
              key={feature}
              className={cn("flex items-center gap-1.5 text-xs leading-[18px]", light ? "text-body" : "text-grey-4")}
            >
              <CheckCircleIcon className={cn("size-4", light ? "text-success-chip" : "text-grey-4")} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "flex flex-col gap-5 border-t p-4",
          light ? "border-border bg-gray-5" : "border-white/10 bg-white/5",
        )}
      >
        {art}
        {cta}
      </div>
    </article>
  );
}

/** Quick Practice: two answered tiles, an "Explain" tile and an unanswered one. */
function AnswerTiles() {
  return (
    <div aria-hidden="true" className="grid grid-cols-4 gap-3">
      {[0, 1].map((i) => (
        <span key={i} className="flex h-6 items-center justify-center rounded-sm border border-success-chip/50 bg-success-chip-bg">
          <CheckCircleIcon className="size-3.5 text-success-chip" />
        </span>
      ))}
      <span className="flex h-6 items-center justify-center rounded-sm border border-primary-2 bg-primary-soft text-[10px] text-accent">
        Explain
      </span>
      <span className="flex h-6 items-center justify-center rounded-sm border border-dashed border-muted text-[10px] text-muted">
        ...
      </span>
    </div>
  );
}

/** Mock Exam: twenty progress cells, the first thirteen done. */
function ProgressBars() {
  return (
    <div aria-hidden="true" className="mx-auto grid w-full max-w-[332px] grid-cols-10 gap-1 py-1">
      {Array.from({ length: 20 }, (_, i) => (
        <span
          key={i}
          className={cn("h-2.5 rounded-[2px] border", i < 13 ? "border-muted bg-muted" : "border-muted/70")}
        />
      ))}
    </div>
  );
}
