import { Badge } from "@/components/site/Badge";
import { IconPlaceholder } from "./AssetPlaceholder";

/*
  design/site/web/home-web2.png · design/site/mobile/home-mobile3-4.png

  Four outlined cards, 4-up on desktop and stacked on mobile. The grid stretches them
  to a common height, which is why the frame shows slack under the shorter cards.
*/
const MODULES = [
  {
    name: "Scan",
    description:
      "Connect your scanners, digitise documents at scale, and extract text with high-accuracy OCR.",
  },
  {
    name: "Records",
    description:
      "Build searchable, audit-ready personnel files by linking documents, clearances, and service history.",
  },
  {
    name: "Mock Exam",
    description:
      "Help your team prepare with practice exams, track their progress, and assess readiness before the real test.",
  },
  {
    name: "CBT",
    description:
      "Run proctored computer-based tests with anti-cheat monitoring and instant, reliable results.",
  },
];

export function Solutions() {
  return (
    <>
      <Badge>Our solutions</Badge>

      <h2
        id="solutions-title"
        className="mt-5 max-w-2xl font-heading text-h2 text-heading lg:text-h2-lg"
      >
        Four modules. One platform. Everything connected.
      </h2>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
        Disconnected tools create gaps. TDARS brings scanning, records, training, and
        testing into one secure system.
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {MODULES.map((module) => (
          <li
            key={module.name}
            className="rounded-md border border-border bg-surface p-6"
          >
            <IconPlaceholder />
            <h3 className="mt-5 font-heading text-h4 text-heading">{module.name}</h3>
            <p className="mt-2 text-base leading-relaxed text-body lg:text-sm lg:leading-normal">
              {module.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
