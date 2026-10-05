/*
  design/site/individual/13-test1.png … 16-test4.png

  The same band as Organizations' "Still running on paper?" — measured identical:
    Section  1440 x Hug 1026 · #2D2D2D · 13px dashed top rule · padding 80
    Header   H1-weight display heading (2 lines) + Body 1 note
    Row      Fill 1280 x FIXED 570 · three columns of 426.67
    Column   border TOP + RIGHT 1px Grey/3 #D9D9D9 · padding 40/32 · gap 40
             title H6 (Inter 600 20/30) · body 16/24 Grey/4 · media card below

  Media cards are exported WITH their own background + border (2x JPEGs), so no frame is drawn here.
*/
import Image from "next/image";

const PILLARS = [
  { title: "Timed sessions", description: "Practise within the expected time.", image: "timed", height: 770 },
  { title: "Full question sets", description: "Experience a complete mock exam.", image: "question-set", height: 770 },
  {
    title: "Focused performance review",
    description: "See where you performed well and where you need more work.",
    image: "performance",
    height: 722,
  },
];

export function TestYourself() {
  return (
    <div className="flex flex-col gap-10 lg:gap-15">
      <header className="flex flex-col gap-5 lg:max-w-[720px]">
        <h2 id="test-title" className="font-heading text-h1 text-grey-5 lg:text-h1-lg">
          When you&apos;re ready, test yourself.
        </h2>
        <p className="text-sm leading-5 font-medium text-gray-5 lg:text-base lg:leading-6">
          Simulate the pressure of an exam with a structured practice session designed to help you measure your
          readiness. Mock exams are for practice and preparation. They do not produce certificates.
        </p>
      </header>

      <ul className="grid lg:h-[570px] lg:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <li
            key={pillar.title}
            className={
              "flex flex-col gap-6 border-t border-divider-on-dark py-8 lg:gap-10 lg:px-8 lg:py-10" +
              (i < 2 ? " lg:border-r" : "")
            }
          >
            <div className="flex flex-col gap-[11px]">
              <h3 className="text-h6 text-grey-5">{pillar.title}</h3>
              <p className="text-base leading-6 text-grey-4">{pillar.description}</p>
            </div>
            <Image
              src={`/images/individual/test-yourself/${pillar.image}.jpg`}
              alt=""
              width={726}
              height={pillar.height}
              sizes="(min-width: 1024px) 363px, 100vw"
              className="h-auto w-full max-w-[363px] rounded-[16px]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
