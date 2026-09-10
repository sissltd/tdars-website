import { NextResponse } from "next/server";

import { validateRequestAccess } from "@/lib/requestAccess";

/*
  Proxy for POST /api/v1/onboarding/requests-access.

  WHY A PROXY AND NOT A FETCH FROM THE FORM — two reasons:

  1. `TDARS_API_URL` stays server-only. A `NEXT_PUBLIC_` variable is compiled
     into the client bundle, which would publish the API host.
  2. The endpoint is public and unauthenticated, so it is worth validating and
     rate-limiting on our own side before passing anything on.

  A third reason applied until 10/09/2026 and no longer does: the stand-in
  backend was plain HTTP, and an HTTPS page may not call an HTTP endpoint — the
  browser blocks it as mixed content, silently, with no response for the form to
  handle. `api.tdars.org` is HTTPS, so that constraint is gone. Recorded because
  it was what made the proxy UNAVOIDABLE; the two reasons above are why it is
  still the right shape, so the proxy stays.
*/

/** Never prerender or cache — this is a write. */
export const dynamic = "force-dynamic";

const UPSTREAM_PATH = "/onboarding/requests-access";
const UPSTREAM_TIMEOUT_MS = 15_000;

/*
  A small in-memory limit, per IP.

  Deliberately loose: Nigerian carriers NAT heavily, so several genuine people
  can share one address, and this form is submitted once by a given
  organisation. It is here to stop a script hammering an unauthenticated
  endpoint, not to police real submissions.

  WARNING: in-memory means per instance and lost on restart. That is honest for
  what it is — a speed bump. Anything stronger belongs at the edge or upstream.
*/
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60_000;
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter(
    (at) => now - at < RATE_WINDOW_MS,
  );
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  // First entry is the original client; the rest are proxies.
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const baseUrl = process.env.TDARS_API_URL;
  if (!baseUrl) {
    // Fail rather than pretend. A form that reports success while dropping the
    // submission is worse than one that is plainly unavailable — nobody chases
    // a request they were told went through.
    console.error("TDARS_API_URL is not set; cannot forward access request.");
    return NextResponse.json(
      { error: "unavailable" },
      { status: 503 },
    );
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { ok, errors, payload } = validateRequestAccess(body);
  if (!ok || !payload) {
    return NextResponse.json(
      { error: "invalid_request", fields: errors },
      { status: 400 },
    );
  }

  // Without this an unreachable upstream holds the request open until the
  // platform's own timeout, and the reader watches a spinner for a minute.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(
      `${baseUrl.replace(/\/$/, "")}${UPSTREAM_PATH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        cache: "no-store",
      },
    );

    if (!upstream.ok) {
      // Logged with the status and body so a 400 from a contract change is
      // diagnosable; NOT returned to the browser, which would leak upstream
      // detail to an unauthenticated caller.
      const detail = await upstream.text().catch(() => "");
      console.error(
        `Access request upstream failed: ${upstream.status} ${detail.slice(0, 500)}`,
      );
      return NextResponse.json(
        { error: "upstream_error" },
        { status: upstream.status === 400 ? 400 : 502 },
      );
    }

    /*
      The endpoint is IDEMPOTENT — a duplicate email on a pending or approved
      request returns the existing record rather than an error. So there is no
      "already requested" case to handle here or to show the reader: submitting
      twice is simply not a mistake.
    */
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    console.error("Access request could not be forwarded:", error);
    return NextResponse.json(
      { error: timedOut ? "timeout" : "unavailable" },
      { status: 504 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
