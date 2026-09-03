import type { ComponentType } from "react";

import { cn } from "@/lib/cn";

import { Badge } from "@/components/site/Badge";
import { HeadingLines } from "@/components/site/HeadingLines";
import {
  ExaminationManagementIcon,
  GradingWorkflowsIcon,
  InstantScoringIcon,
  LiveMonitoringIcon,
  PerformanceBreakdownIcon,
  PracticeExamsIcon,
  QuestionBanksIcon,
  QuestionLibraryIcon,
  ReadinessInsightsIcon,
  SecureExamSessionsIcon,
} from "@/components/site/icons";
import { StepCard } from "./StepCard";

/*
  design/site/web/home-web4.png + home-web5.png · design/site/mobile/home-mobile6-10.png

  Measured off the frame:
    Section   Fill 1440 x Hug 1503 · padding 80 · gap 60   (mobile: 390 · 40/16 · gap 40)
    Header    FIXED 720 x Hug 200 · gap 16                 (mobile: Fill 358)
    Columns   Fill 1280 x Hug 584 · HORIZONTAL
      left      Fill 640 · border TOP + RIGHT 1px #D9D9D9 · padding 40/32 · gap 40
      right     Fill 640 · border TOP only
      (mobile: stacked, only the SECOND column keeps a top rule — padding 40 top,
       no side padding, gap 20)
    Col head  Fill 576 x Hug 128 · gap 16
      heading   H4/BOLD — 18/24 mobile, 24/32 desktop
      intro     Subheading/Regular — Inter 400 16/24, Gray/Gray 1
    Feature   Hug 42 · gap 20
      icon      40 x 40
      title     Body 1/SEMI BOLD (600), Gray/Gray 1
      body      Body 2/Regular, Gray/Gray 2
    Prepare   FIXED 720 x Hug 148 · gap 12
    Step grid Fill 1280 x Hug 231 · gap 24 · cards Fill 302

  Both the section description and the column intros are Gray/Gray 1 #373737 —
  the heading colour, not the lighter body grey they were using.

  ⚠️ INFERRED: the gap between feature rows on DESKTOP. The frame pins the column
  at 584 tall, which back-solves to ~29px — not a value used anywhere else in the
  system. The mobile list gap IS measured at 24, so 24 is used at both sizes and
  the desktop column hugs a little shorter than the frame.
*/
type Feature = {
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
};

type FeatureColumn = {
  /*
    Split where the FRAME breaks the line, not where 576px happens to wrap.
    "before it counts." and "control." each sit alone on the second line, which
    natural wrapping does not reliably produce — a few pixels either way and
    "improve" drops down with them.
  */
  heading: [string, string];
  intro: string;
  features: Feature[];
};

const COLUMNS: FeatureColumn[] = [
  {
    heading: ["Practice with TDARS Mock. Measure and improve", "before it counts."],
    intro:
      "Mock Exam gives candidates a structured practice environment to prepare for examinations, understand their performance and improve over time.",
    features: [
      {
        title: "Practice Exams",
        Icon: PracticeExamsIcon,
        description: "Replicate upcoming assessments under timed structures",
      },
      {
        title: "Question Library",
        Icon: QuestionLibraryIcon,
        description: "Subject and topic filters isolated from official banks",
      },
      {
        title: "Instant Scoring",
        Icon: InstantScoringIcon,
        description: "Real-time candidate evaluation upon mock completion",
      },
      {
        title: "Performance Breakdown",
        Icon: PerformanceBreakdownIcon,
        description: "High-resolution domain and topic scoring models",
      },
      {
        title: "Readiness Insights",
        Icon: ReadinessInsightsIcon,
        description: "Data-driven preparation recommendations based on results",
      },
    ],
  },
  {
    heading: ["Secure assessments with complete operational", "control."],
    intro:
      "Create, deliver, monitor, grade and manage computer-based examinations from one controlled assessment environment.",
    features: [
      {
        title: "Examination Management",
        Icon: ExaminationManagementIcon,
        description: "Create promotion and certification assessments",
      },
      {
        title: "Question Banks",
        Icon: QuestionBanksIcon,
        description: "Reusable question libraries with category tag systems",
      },
      {
        title: "Secure Exam Sessions",
        Icon: SecureExamSessionsIcon,
        description: "Navigation timers, auto-save and active attestations",
      },
      {
        title: "Live Monitoring",
        Icon: LiveMonitoringIcon,
        description: "Oversee progress, connections and integrity signals",
      },
      {
        title: "Grading & Workflows",
        Icon: GradingWorkflowsIcon,
        description: "Controlled rubrics, auto-scoring and managed release",
      },
    ],
  },
];

const STEPS = [
  {
    number: "01",
    title: "Practice",
    description:
      "Set structured mock examinations in TDARS Mock Exam to build confidence and familiarity.",
  },
  {
    number: "02",
    title: "Assess Readiness",
    description:
      "Review scores, topic performance, and improvement trends to identify gaps before the real exam.",
  },
  {
    number: "03",
    title: "Official Examination",
    description:
      "Set the official assessment in TDARS CBT under controlled, monitored conditions.",
  },
  {
    number: "04",
    title: "Audit & Result",
    description:
      "Institutions grade, review, and release results with full traceability and audit trails.",
  },
];

export function MockExamsCbt() {
  return (
    /* gap 60 desktop / 40 mobile between the four blocks — the section's own gap. */
    <div className="flex flex-col gap-10 lg:gap-15">
      <header className="flex flex-col gap-4 lg:max-w-[720px]">
        <Badge className="self-start">Mock Exams &amp; CBT</Badge>

        <h2
          id="mock-exams-title"
          className="font-heading text-h2 font-bold text-heading lg:text-h2-lg"
        >
          From preparation to the real exam, all in one ecosystem.
        </h2>

        <p className="text-sm leading-5 font-medium text-heading lg:text-base lg:leading-6">
          TDARS gives institutions the tools to run structured computer-based assessments
          while giving candidates a dedicated environment to practice, measure their
          readiness, and improve.
        </p>
      </header>

      {/*
        The rules are drawn per COLUMN, not on the wrapper: on desktop both columns
        take a top rule and the first also takes a right one, which is what forms the
        vertical divider. On mobile only the SECOND keeps a rule, so the two blocks
        read as separated without a stray line above the first.
      */}
      <div className="lg:grid lg:grid-cols-2">
        {COLUMNS.map((column, index) => (
          <div
            key={column.heading[0]}
            className={cn(
              "flex flex-col gap-5 lg:gap-10 lg:border-t lg:border-divider lg:px-8 lg:py-10",
              index === 0
                ? "lg:border-r"
                : "mt-10 border-t border-divider pt-10 lg:mt-0 lg:pt-10",
            )}
          >
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-h4 font-bold text-heading lg:text-h4-lg">
                <HeadingLines lines={column.heading} />
              </h3>

              {/* Subheading/Regular — 16/24 at BOTH sizes, and Gray 1 not Gray 2. */}
              <p className="text-base leading-6 text-heading">{column.intro}</p>
            </div>

            <ul className="flex flex-col gap-6">
              {column.features.map(({ title, description, Icon }) => (
                <li key={title} className="flex items-start gap-5">
                  {/* Fixed 40px box: "Practice Exams" is a 34px export and would
                      otherwise be scaled 17% larger than the other nine. */}
                  <span className="flex size-10 shrink-0 items-center justify-center">
                    <Icon />
                  </span>
                  <div>
                    <h4 className="text-sm leading-5 font-semibold text-heading lg:text-base lg:leading-6">
                      {title}
                    </h4>
                    <p className="text-xs leading-[18px] text-body lg:text-sm lg:leading-5">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* This header's gap is 12, where the section header above it is 16. */}
      <header className="flex flex-col gap-3 lg:max-w-[720px]">
        <h2 className="font-heading text-h2 font-bold text-heading lg:text-h2-lg">
          Prepare with TDARS Mock Exam. Assess with TDARS CBT.
        </h2>

        <p className="text-sm leading-5 font-medium text-heading lg:text-base lg:leading-6">
          TDARS Mock Exam helps candidates prepare. TDARS CBT gives institutions the
          controlled environment to deliver the official assessment.
        </p>
      </header>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <StepCard key={step.number} tone="outline" {...step} />
        ))}
      </ul>
    </div>
  );
}
