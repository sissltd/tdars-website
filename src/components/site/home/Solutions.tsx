import { Badge } from "@/components/site/Badge";
import {
  CbtModuleIcon,
  MockExamModuleIcon,
  RecordsModuleIcon,
  ScanModuleIcon,
} from "./moduleIcons";

/*
  design/site/web/home-web2.png · design/site/mobile/home-mobile3-4.png

  Measured off the frame:
    Section    Fill 1440 x Hug 638 · padding 80 · gap 60   (mobile: 60/16 · gap 40)
    Eyebrow    102 x 24 desktop, 89 x 20 mobile — Body 1/Medium, Primary/Primary 1
    Heading    720 x 88 (2 lines) desktop, 358 x 60 mobile — H2/BOLD, Gray/Gray 1
    Body       720 x 48 desktop, 358 x 60 mobile — Body 1/MEDIUM, Gray/Gray 1 (not Gray 2)
    Card       Fill 302 x Fixed 218 · radius 12 · 1px #E6E6E6 · padding 20 · gap 20
               (mobile: Fill 358 x Hug 132 · padding 12 · gap 20)
    Icon       27 x 28
    Card title 49 x 30 desktop, 39 x 22 mobile — H5/BOLD, Gray/Gray 1
    Card body  262 x 60 desktop, 334 x 36 mobile — Body 2/Regular, Gray/Gray 2

  Note the lead paragraph is Gray/Gray 1 and MEDIUM weight — the same colour as
  the heading, not the lighter body grey used elsewhere on the page.
*/
const MODULES = [
  {
    name: "Scan",
    Icon: ScanModuleIcon,
    description:
      "Connect your scanners, digitise documents at scale, and extract text with high-accuracy OCR.",
  },
  {
    name: "Records",
    Icon: RecordsModuleIcon,
    description:
      "Build searchable, audit-ready personnel files by linking documents, clearances, and service history.",
  },
  {
    name: "Mock Exam",
    Icon: MockExamModuleIcon,
    description:
      "Help your team prepare with practice exams, track their progress, and assess readiness before the real test.",
  },
  {
    name: "CBT",
    Icon: CbtModuleIcon,
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
        className="mt-5 max-w-[720px] font-heading text-h2 font-bold text-heading lg:text-h2-lg"
      >
        Four modules. One platform. Everything connected.
      </h2>

      <p className="mt-4 max-w-[720px] text-sm font-medium leading-5 text-heading lg:text-base lg:leading-6">
        Disconnected tools create gaps. TDARS brings scanning, records, training, and
        testing into one secure system.
      </p>

      {/* 60px below the header block at desktop, 40px on mobile — the section's gap. */}
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-15 lg:grid-cols-4 lg:gap-6">
        {MODULES.map(({ name, description, Icon }) => (
          <li
            key={name}
            className="flex flex-col gap-5 rounded-md border border-border bg-surface p-3 lg:h-[218px] lg:p-5"
          >
            {/*
              CBT is 37 wide where the others are 27; 28 tall is the constant.

              `self-start` is load-bearing: the card is a flex COLUMN, so its
              children stretch to the full card width by default. `w-auto` does
              not opt out of that — the SVGs silently centred themselves inside a
              full-width box, and the one raster icon stretched into a smear.
            */}
            <Icon className="h-7 w-auto shrink-0 self-start" />
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-base font-bold leading-[22px] text-heading lg:text-h5 lg:font-bold">
                {name}
              </h3>
              <p className="text-xs leading-[18px] text-body lg:text-sm lg:leading-5">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
