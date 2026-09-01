import { Badge } from "@/components/site/Badge";
import { IconPlaceholder } from "./AssetPlaceholder";
import { StepCard } from "./StepCard";

/*
  design/site/web/home-web4.png + home-web5.png · design/site/mobile/home-mobile6-10.png

  One section, two blocks: the Mock/CBT feature columns (split by a vertical hairline
  on desktop, a horizontal one on mobile), then the four-step "Prepare … Assess" row.
*/
type Feature = {
  title: string;
  description: string;
};

type FeatureColumn = {
  heading: string;
  intro: string;
  features: Feature[];
};

const COLUMNS: FeatureColumn[] = [
  {
    heading: "Practice with TDARS Mock. Measure and improve before it counts.",
    intro:
      "Mock Exam gives candidates a structured practice environment to prepare for examinations, understand their performance and improve over time.",
    features: [
      {
        title: "Practice Exams",
        description: "Replicate upcoming assessments under timed structures",
      },
      {
        title: "Question Library",
        description: "Subject and topic filters isolated from official banks",
      },
      {
        title: "Instant Scoring",
        description: "Real-time candidate evaluation upon mock completion",
      },
      {
        title: "Performance Breakdown",
        description: "High-resolution domain and topic scoring models",
      },
      {
        title: "Readiness Insights",
        description: "Data-driven preparation recommendations based on results",
      },
    ],
  },
  {
    heading: "Secure assessments with complete operational control.",
    intro:
      "Create, deliver, monitor, grade and manage computer-based examinations from one controlled assessment environment.",
    features: [
      {
        title: "Examination Management",
        description: "Create promotion and certification assessments",
      },
      {
        title: "Question Banks",
        description: "Reusable question libraries with category tag systems",
      },
      {
        title: "Secure Exam Sessions",
        description: "Navigation timers, auto-save and active attestations",
      },
      {
        title: "Live Monitoring",
        description: "Oversee progress, connections and integrity signals",
      },
      {
        title: "Grading & Workflows",
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
    <>
      <Badge>Mock Exams &amp; CBT</Badge>

      <h2
        id="mock-exams-title"
        className="mt-5 max-w-2xl font-heading text-h2 text-heading lg:text-h2-lg"
      >
        From preparation to the real exam, all in one ecosystem.
      </h2>

      <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
        TDARS gives institutions the tools to run structured computer-based assessments
        while giving candidates a dedicated environment to practice, measure their
        readiness, and improve.
      </p>

      <div className="mt-10 divide-y divide-border lg:mt-16 lg:grid lg:grid-cols-2 lg:divide-x lg:divide-y-0 lg:border-t lg:border-border">
        {COLUMNS.map((column, index) => (
          <div
            key={column.heading}
            className={
              index === 0 ? "pb-10 lg:pt-10 lg:pr-14 lg:pb-0" : "pt-10 lg:pt-10 lg:pl-14"
            }
          >
            <h3 className="max-w-md font-heading text-h3 text-heading lg:text-h3-lg">
              {column.heading}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-body lg:text-sm lg:leading-normal">
              {column.intro}
            </p>

            <ul className="mt-8 space-y-6">
              {column.features.map((feature) => (
                <li key={feature.title} className="flex gap-4">
                  <IconPlaceholder className="mt-0.5 size-7" />
                  <div>
                    <h4 className="text-base font-semibold text-heading lg:text-sm">
                      {feature.title}
                    </h4>
                    <p className="mt-1 text-base leading-relaxed text-body lg:text-sm lg:leading-normal">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-14 max-w-2xl font-heading text-h2 text-heading lg:mt-20 lg:text-h2-lg">
        Prepare with TDARS Mock Exam. Assess with TDARS CBT.
      </h2>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
        TDARS Mock Exam helps candidates prepare. TDARS CBT gives institutions the
        controlled environment to deliver the official assessment.
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <StepCard key={step.number} tone="outline" {...step} />
        ))}
      </ul>
    </>
  );
}
