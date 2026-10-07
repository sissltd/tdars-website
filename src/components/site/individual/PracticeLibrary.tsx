"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/site/Badge";
import { ArrowRightIcon, CartIcon, ChevronDownIcon, SearchIcon } from "@/components/site/icons";
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
  Yemi's updated "Practice library" (07/10/2026), now the section right after the
  trusted band. Measured:
    Band     1440 x Hug · #2D2D2D · 13px dashed top rule (4/4, Gray 3) · padding 80 · gap 60
    Card     Fill 1280 · #FFFFFF · radius 20 · padding 32/40 · gap 40
    Header   badge, H2 and lead all CENTRED
    Search   Gray 5 panel: label, then input + Type / Category / Year + cart on one row,
             filter chips centred beneath (All active: rust ring on Primary 4)
    Grid     4 columns of 165px cards · "View all practice →" as a rust text link

  The band and its dashed rule come from <Section tone="dark" className="dash-rule-top">
  in the page; this component is the white card. Search, dropdowns and chips filter the
  sample list in the browser (see content/individual.ts).
*/
const ANY = "";
const categoryOf = (item: PracticeItem) => item.meta.split("•")[0].trim();
const yearOf = (item: PracticeItem) => item.title.match(/\((\d{4})\)/)?.[1] ?? null;

const PROVIDERS = [...new Set(PRACTICE_ITEMS.map((i) => i.provider))];
const CATEGORIES = [...new Set(PRACTICE_ITEMS.map(categoryOf))];
const YEARS = [...new Set(PRACTICE_ITEMS.map(yearOf).filter((y): y is string => !!y))];

export function PracticeLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PracticeFilter>("All");
  const [provider, setProvider] = useState(ANY);
  const [category, setCategory] = useState(ANY);
  const [year, setYear] = useState(ANY);

  const items = useMemo(
    () =>
      PRACTICE_ITEMS.filter(
        (item) =>
          matchesFilter(item, filter, query) &&
          (!provider || item.provider === provider) &&
          (!category || categoryOf(item) === category) &&
          (!year || yearOf(item) === year),
      ),
    [filter, query, provider, category, year],
  );

  return (
    <div className="flex flex-col gap-8 rounded-lg bg-surface px-4 py-6 md:px-6 lg:gap-10 lg:px-10 lg:py-8">
      <header className="flex flex-col items-center gap-4 text-center">
        <Badge>Practice library</Badge>
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
          <div className="mt-2 flex flex-col gap-2 md:flex-row">
            <div className="relative md:flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-body" />
              <input
                id="practice-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search practice exams..."
                className="h-10 w-full rounded-sm border border-border bg-surface pr-3 pl-10 text-sm text-heading placeholder:text-muted"
              />
            </div>
            <div className="flex gap-2">
              <FilterSelect label="Type" value={provider} onChange={setProvider} options={PROVIDERS} width="md:w-[92px]" />
              <FilterSelect label="Category" value={category} onChange={setCategory} options={CATEGORIES} width="md:w-[112px]" />
              <FilterSelect label="Year" value={year} onChange={setYear} options={YEARS} width="md:w-[80px]" />
              <a
                href={INDIVIDUAL_START_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open your practice cart"
                className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-border bg-surface text-body transition-colors hover:border-primary-2"
              >
                <CartIcon className="size-5" />
              </a>
            </div>
          </div>
          <div
            role="group"
            aria-label="Filter practice exams"
            className="mt-4 flex flex-wrap justify-center gap-2"
          >
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
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <a
        href={INDIVIDUAL_START_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 self-center text-sm font-medium text-accent hover:underline"
      >
        View all practice
        <ArrowRightIcon className="size-4" />
      </a>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  width,
}: {
  // Fixed per frame on desktop: a native select otherwise grows to its longest option.
  width: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className={cn("relative min-w-0 flex-1 md:flex-none", width)}>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-sm border border-border bg-surface pr-8 pl-3 text-sm text-heading"
      >
        <option value={ANY}>{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-body" />
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
