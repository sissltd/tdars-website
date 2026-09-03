import { cn } from "@/lib/cn";
import type { LegalDocument as LegalDocumentType } from "@/content/legal";
import { ArrowUpIcon } from "@/components/site/icons";

/*
  design/site/web/home-web-T&C1..3.png · home-web-privacy-policy1..2.png
  design/site/mobile/home-mobile-T&C1..9.png · home-mobile-privacy1..5.png

  Two-column on desktop: the document on the left, a contents rail on the right
  that stays with you as you scroll, and "Back to Top" beneath it. The mobile
  frames drop the rail entirely — a table of contents that needs its own scroll
  to reach is worse than none — so it is `hidden lg:block` rather than stacked.

  The rail is plain anchors, not JS: the browser already handles hash navigation,
  history and "open in new tab" correctly, and every target survives with
  JavaScript off.
*/
export function LegalDocument({ document }: { document: LegalDocumentType }) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
      <div>
        <h1 className="font-heading text-h1 text-heading lg:text-h1-lg">
          {document.title}
        </h1>

        <p className="mt-3 flex items-center gap-2 text-sm text-accent">
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-primary" />
          {document.lastUpdated}
        </p>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-body lg:mt-12">
          {document.intro}
        </p>

        {document.sections.map((section, index) => (
          <section key={section.id} id={section.id} className="mt-10 scroll-mt-24">
            <h2 className="font-heading text-h4 text-heading lg:text-h3">
              {document.numbered ? `${index + 1}. ` : ""}
              {section.heading}
            </h2>

            {section.blocks.map((block, blockIndex) =>
              block.kind === "paragraph" ? (
                <p
                  key={blockIndex}
                  className="mt-4 max-w-3xl text-sm leading-relaxed text-body"
                >
                  {block.text}
                </p>
              ) : (
                <ul
                  key={blockIndex}
                  className={cn(
                    "mt-4 max-w-3xl space-y-2 text-sm leading-relaxed text-body",
                    // `plain` keeps the semantics of a list while matching the
                    // frame, which writes the Acceptable-use prohibitions as
                    // unmarked lines.
                    block.style === "plain"
                      ? "list-none"
                      : "list-disc space-y-2 pl-5 marker:text-body",
                  )}
                >
                  {block.items.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}
      </div>

      <aside className="hidden lg:block">
        <nav
          aria-label={`${document.title} sections`}
          className="sticky top-28 space-y-3"
        >
          {document.sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block text-sm text-body transition-colors hover:text-accent"
            >
              {section.tocLabel}
            </a>
          ))}

          <a
            href="#top"
            className="inline-flex items-center gap-2 pt-6 text-sm text-heading transition-colors hover:text-accent"
          >
            <ArrowUpIcon className="size-4" />
            Back to Top
          </a>
        </nav>
      </aside>
    </div>
  );
}
