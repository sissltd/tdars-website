/*
  Copy and sample data for /individuals — verbatim from Yemi's frames
  (design/site/individual/, 05/10/2026).

  ⚠️ The practice library is SAMPLE CONTENT from the frame. There is no public
  catalogue endpoint yet; when there is, `PRACTICE_ITEMS` becomes a fetch with the
  same shape and nothing else on the page changes.
*/

export type PracticeItem = {
  provider: string;
  title: string;
  meta: string;
  /** null = Free. */
  price: number | null;
  downloads: string;
  isNew?: boolean;
  /** Which filter chips match, beyond Free / Paid. */
  tags: string[];
};

export const PRACTICE_FILTERS = ["All", "JAMB (UTME)", "JSSCE", "IELTS/CELCIP", "Free", "Paid"] as const;
export type PracticeFilter = (typeof PRACTICE_FILTERS)[number];

export const PRACTICE_ITEMS: PracticeItem[] = [
  { provider: "WAEC", title: "Mathematics (2024)", meta: "Senior Secondary • 50 Qs", price: null, downloads: "1.2k", isNew: true, tags: ["JSSCE"] },
  { provider: "JAMB", title: "UTME Mock (2024)", meta: "Tertiary Entry • 180 Qs", price: null, downloads: "840", isNew: true, tags: ["JAMB (UTME)"] },
  { provider: "ICAN", title: "ATS Foundation", meta: "Professional Accounting • 4 papers", price: null, downloads: "310", tags: [] },
  { provider: "CIPM", title: "HRM Professional", meta: "Professional HR • 3 modules", price: 3200, downloads: "520", tags: [] },
  { provider: "IJMB", title: "A/Level Mock", meta: "Foundation Programme • 3 subjects", price: 1800, downloads: "960", tags: [] },
  { provider: "NABTEB", title: "Technical Studies", meta: "Technical Education • 40 Qs", price: 1200, downloads: "720", tags: [] },
  { provider: "TOEFL", title: "English Proficiency", meta: "Study Abroad • 4 sections", price: 6000, downloads: "210", tags: ["IELTS/CELCIP"] },
  { provider: "GRE", title: "Graduate School Prep", meta: "Postgraduate Entry • 3 sections", price: 7500, downloads: "180", tags: [] },
  { provider: "AWS", title: "Cloud Practitioner", meta: "Cloud Computing • 65 Qs", price: 8000, downloads: "145", tags: [] },
  { provider: "HSE", title: "Navy Promotional Examination", meta: "Workplace Safety • 60 Qs", price: 2500, downloads: "1.1k", tags: [] },
  { provider: "IELTS", title: "Academic Writing", meta: "Study Abroad • 4 sections", price: 5500, downloads: "240", tags: ["IELTS/CELCIP"] },
  { provider: "GMAT", title: "MBA Prep", meta: "Business School • 4 sections", price: 9000, downloads: "160", tags: [] },
  { provider: "CompTIA", title: "A+ Essentials", meta: "IT Support • 90 Qs", price: 4000, downloads: "1.4k", tags: [] },
  { provider: "CFA", title: "Level I Ethics", meta: "Investment Analysis • 240 Qs", price: 10000, downloads: "120", tags: [] },
  { provider: "ACCA", title: "Financial Reporting", meta: "Professional Accounting • 4 papers", price: 5000, downloads: "280", tags: [] },
];

export function matchesFilter(item: PracticeItem, filter: PracticeFilter, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (q && ![item.provider, item.title, item.meta].some((v) => v.toLowerCase().includes(q))) return false;
  if (filter === "All") return true;
  if (filter === "Free") return item.price === null;
  if (filter === "Paid") return item.price !== null;
  return item.tags.includes(filter);
}

export function formatNaira(price: number | null): string {
  return price === null ? "Free" : `₦${price.toLocaleString("en-NG")}`;
}

/** "Who it's for" photo tiles: [column, row] on the 7 x 4 grid, as placed in the frame. */
export const AUDIENCE_TILES: { label: string; col: number; row: number; slug: string }[] = [
  { label: "Graduates", col: 4, row: 1, slug: "graduates-1" },
  { label: "Job Seekers", col: 6, row: 1, slug: "job-seekers-1" },
  { label: "Job Seekers", col: 3, row: 2, slug: "job-seekers-2" },
  { label: "Professionals", col: 5, row: 2, slug: "professionals" },
  { label: "Graduates", col: 7, row: 2, slug: "graduates-2" },
  { label: "Job Seekers", col: 6, row: 3, slug: "job-seekers-3" },
  { label: "Graduates", col: 5, row: 4, slug: "graduates-3" },
  { label: "Job Professionals", col: 7, row: 4, slug: "job-professionals" },
];

/** "Trusted by over 30+ organizations" — files in public/images/individual/logos/, sizes as exported. */
export const TRUSTED_ORGS = [
  { name: "Soludesks", slug: "soludesk", width: 311, height: 81 },
  { name: "StayAfrika", slug: "stayafika", width: 269, height: 66 },
  { name: "Ohevai", slug: "ohevai", width: 244, height: 64 },
  { name: "Dev-Kin", slug: "dev-kin", width: 256, height: 64 },
  { name: "tapcard", slug: "tapcard", width: 222, height: 64 },
  { name: "feexeet", slug: "feexeet", width: 264, height: 64 },
];
