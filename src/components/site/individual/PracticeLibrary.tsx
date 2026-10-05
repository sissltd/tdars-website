"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/site/Badge";
import { Button } from "@/components/site/Button";
import { ArrowRightIcon, SearchIcon } from "@/components/site/icons";
import { INDIVIDUAL_START_HREF } from "@/components/site/nav-links";
import { cn } from "@/lib/cn";
import {
  PRACTICE_FILTERS,
  PRACTICE_ITEMS,
  formatNaira,
  matchesFilter,
  type PracticeFilter,
  type PracticeItem,
} from "@/content/individual";

/*
  design/site/individual/10-library1.png … 12-library3.png

  Measured:
    Section  1440 x Hug 1342 · padding 80 · gap 40
    Search   Fill 1280 · Gray 5 panel, label "Search for an exam, subject or topic",
             input, then filter chips (All active: rust ring on Primary 4)
    Grid     4 columns · gap 24 → cards FIXED 310 x 165
    Card     radius 8 · 1px Gray 4 · #F7F7F7 · padding 12 · space-between
             provider in rust Caption/Semi Bold, NEW tag, title Body 1/Semi Bold,
             meta Caption Gray 3, price + download count on the bottom row
    CTA      "View all practice →" centred under the grid

  Search and chips filter the sample list in the browser — see the note at the
  top of content/individual.ts.
*/
export function PracticeLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PracticeFilter>("All");
  const items = useMemo(
    () => PRACTICE_ITEMS.filter((item) => matchesFilter(item, filter, query)),
    [filter, query],
  );

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <header className="flex flex-col gap-4">
        <Badge className="self-start">Practice library</Badge>
        <h2 id="library-title" className="font-heading text-h2 text-heading lg:text-h2-lg">
          Find something to practise
        </h2>
        <p className="text-sm leading-5 font-medium text-heading lg:text-base lg:leading-6">
          Explore practice exams across subjects, professions, certifications, and competitive examinations.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        <div className="rounded-md border border-border bg-gray-5 p-4">
          <label htmlFor="practice-search" className="text-sm leading-5 text-heading">
            Search for an exam, subject or topic
          </label>
          <div className="relative mt-2">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              id="practice-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search practice exams..."
              className="h-10 w-full rounded-sm border border-border bg-surface pr-3 pl-9 text-sm text-heading placeholder:text-muted"
            />
          </div>
          <div role="group" aria-label="Filter practice exams" className="mt-4 flex flex-wrap gap-2">
            {PRACTICE_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "h-8 min-w-24 rounded-full border px-4 text-sm transition-colors",
                  filter === f
                    ? "border-primary bg-primary-soft text-accent"
                    : "border-border bg-surface text-heading hover:border-primary-2",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {items.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {items.map((item) => (
              <li key={`${item.provider}-${item.title}`}>
                <PracticeCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-body">
            Nothing matches that yet. Try a different exam, subject or topic.
          </p>
        )}
      </div>

      <Button href={INDIVIDUAL_START_HREF} external className="self-center px-8">
        View all practice
        <ArrowRightIcon className="size-4" />
      </Button>
    </div>
  );
}

function PracticeCard({ item }: { item: PracticeItem }) {
  return (
    <article className="flex h-[165px] flex-col justify-between rounded-sm border border-border bg-practice-card p-3">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold leading-[18px] text-accent">
            <span aria-hidden="true" className="size-3 rounded-[3px] border border-muted" />
            {item.provider}
          </span>
          {item.isNew ? (
            <span className="rounded-[3px] bg-primary px-1 text-[9px] font-bold leading-[14px] text-primary-foreground">
              NEW
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 text-base font-semibold leading-6 text-heading">{item.title}</h3>
        <p className="text-xs leading-[18px] text-muted">{item.meta}</p>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-heading">{formatNaira(item.price)}</span>
        <span className="flex items-center gap-1 text-xs text-muted" aria-label={`${item.downloads} downloads`}>
          <DownloadsGlyph />
          {item.downloads}
        </span>
      </div>
    </article>
  );
}

function DownloadsGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
      <path d="M10 1.5H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4.5z" />
      <path d="M10 1.5v3h3M8 7v4m-1.5-1.5L8 11l1.5-1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
