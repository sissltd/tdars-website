/*
  The contract for POST /api/v1/onboarding/requests-access.

  Every value below is taken from the endpoint's own OpenAPI schema, and every
  label from the description it publishes beside them — so what the reader picks
  and what the backend is sent cannot drift apart.

  GENERATED from the live schema, then checked in. Regenerate rather than edit
  by hand if the backend adds a value.

  WARNING: these are the values the API ACCEPTS, which are not the lists the
  Figma drew. The frame showed six invented organisation types and three user
  bands borrowed from the subscription tiers ("50 - 300"); the API has 26 and 8,
  and its middle band is 50 - 200. The frame's strings are a 400, so the API wins.

  Required by the schema: first_name, last_name, email, org_type,
  estimated_users, modules_interested (minItems 1). `notes` is OPTIONAL there —
  the form asks for it anyway because the frame marks every field required.
*/

export type Option = { value: string; label: string };

export const ORG_TYPES: Option[] = [
  { value: "federal_ministry", label: "Federal Ministry" },
  { value: "state_ministry", label: "State Ministry" },
  { value: "federal_agency", label: "Federal Agency / Parastatals" },
  { value: "state_agency", label: "State Agency / Parastatals" },
  { value: "local_government", label: "Local Government Authority" },
  { value: "military", label: "Military / Defence" },
  { value: "police_paramilitary", label: "Police / Paramilitary" },
  { value: "judiciary", label: "Judiciary / Courts" },
  { value: "legislature", label: "Legislature / National Assembly" },
  { value: "public_university", label: "Public University" },
  { value: "private_university", label: "Private University" },
  { value: "polytechnic", label: "Polytechnic / College of Education" },
  { value: "primary_secondary", label: "Primary / Secondary School" },
  { value: "research_institute", label: "Research Institute" },
  { value: "hospital_health", label: "Hospital / Health Institution" },
  { value: "bank_finance", label: "Bank / Financial Institution" },
  { value: "insurance", label: "Insurance Company" },
  { value: "telecom", label: "Telecommunications" },
  { value: "oil_gas", label: "Oil & Gas" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "tech_startup", label: "Technology / Startup" },
  { value: "consulting", label: "Consulting Firm" },
  { value: "ngo", label: "NGO / Non-Profit" },
  { value: "international_org", label: "International Organisation" },
  { value: "religious_org", label: "Religious Organisation" },
  { value: "other", label: "Other" },
];

export const ESTIMATED_USERS: Option[] = [
  { value: "under_10", label: "Under 10" },
  { value: "10_50", label: "10 - 50" },
  { value: "50_200", label: "50 - 200" },
  { value: "200_500", label: "200 - 500" },
  { value: "500_1000", label: "500 - 1,000" },
  { value: "1000_5000", label: "1,000 - 5,000" },
  { value: "5000_20000", label: "5,000 - 20,000" },
  { value: "above_20000", label: "Above 20,000" },
];

export const MODULES: Option[] = [
  { value: "scan_terminal", label: "Scan Terminal" },
  { value: "records_system", label: "Records System" },
  { value: "mock_radar", label: "MockRadar" },
  { value: "proctored_cbt", label: "Proctored CBT" },
];

/** The JSON body the API expects. */
export type RequestAccessPayload = {
  first_name: string;
  last_name: string;
  email: string;
  org_type: string;
  estimated_users: string;
  modules_interested: string[];
  notes?: string;
};

const values = (options: Option[]) => new Set(options.map((o) => o.value));

const ORG_TYPE_VALUES = values(ORG_TYPES);
const ESTIMATED_USERS_VALUES = values(ESTIMATED_USERS);
const MODULE_VALUES = values(MODULES);

/**
 * Validate a submission against the same contract the API enforces.
 *
 * Runs on the SERVER, in the route handler: the browser form is the only caller
 * today, but a public endpoint reached through our own proxy has to assume it
 * is not. Returns the field names that failed, so the caller decides wording.
 */
export function validateRequestAccess(input: unknown): {
  ok: boolean;
  errors: string[];
  payload?: RequestAccessPayload;
} {
  const errors: string[] = [];
  const body = (input ?? {}) as Record<string, unknown>;
  const text = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  const first_name = text("first_name");
  const last_name = text("last_name");
  const email = text("email");
  const org_type = text("org_type");
  const estimated_users = text("estimated_users");
  const notes = text("notes");
  const modules_interested = Array.isArray(body.modules_interested)
    ? (body.modules_interested as unknown[]).filter(
        (m): m is string => typeof m === "string",
      )
    : [];

  // 150 is the schema's own maxLength on both names.
  if (!first_name || first_name.length > 150) errors.push("first_name");
  if (!last_name || last_name.length > 150) errors.push("last_name");
  // Deliberately loose: the API is the authority on what address it accepts,
  // and an over-strict pattern here would reject real government addresses.
  if (!email || !email.includes("@")) errors.push("email");
  if (!ORG_TYPE_VALUES.has(org_type)) errors.push("org_type");
  if (!ESTIMATED_USERS_VALUES.has(estimated_users)) errors.push("estimated_users");
  // minItems 1 in the schema, and every entry must be a known module.
  if (
    modules_interested.length === 0 ||
    modules_interested.some((m) => !MODULE_VALUES.has(m))
  ) {
    errors.push("modules_interested");
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    errors: [],
    payload: {
      first_name,
      last_name,
      email,
      org_type,
      estimated_users,
      modules_interested,
      // Omitted rather than sent empty — the field is optional, and "" is not
      // the same thing as "not provided" to a record someone will read later.
      ...(notes ? { notes } : {}),
    },
  };
}
