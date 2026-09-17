import { NextResponse } from "next/server";

import { validateSupport } from "@/lib/support";

/*
  Proxy for POST /api/v1/support/ — the footer's Contact Us form.

  Same shape and the same reasons as `app/api/request-access/route.ts`:

  1. `TDARS_API_URL` stays server-only. A `NEXT_PUBLIC_` variable is compiled
     into the client bundle, which would publish the API host.
  2. The endpoint is public and unauthenticated, so it is worth validating and
     rate-limiting on our own side before passing anything on.

  ⚠️ The upstream path ENDS IN A SLASH — `/support/`, not `/support`. Django
  redirects the un-slashed form, and a 301 turns a POST into a GET on some
  clients, which would silently drop the message.
*/

/** Never prerender or cache — this is a write. */
export const dynamic = "force-dynamic";

const UPSTREAM_PATH = "/support/";
const UPSTREAM_TIMEOUT_MS = 15_000;

/*
  A small in-memory limit, per IP — tighter than Request Access's 5 per 10
  minutes because a contact form is the more attractive target: it is shorter,
  free-text, and lands in a human's queue. Still loose enough for a real person
  who sends one message, then a correction.

  WARNING: in-memory means per instance and lost on restart. A speed bump, not a
  control; anything stronger belongs at the edge or upstream.
*/
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60_000;
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((at) => now - at < RATE_WINDOW_MS);
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
    // message is worse than one that is plainly unavailable — nobody chases a
    // reply to a message they were told had been sent.
    console.error("TDARS_API_URL is not set; cannot forward contact message.");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
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

  const { ok, errors, payload } = validateSupport(body);
  if (!ok || !payload) {
    return NextResponse.json({ error: "invalid_request", fields: errors }, { status: 400 });
  }

  // Without this an unreachable upstream holds the request open until the
  // platform's own timeout, and the reader watches a spinner for a minute.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(`${baseUrl.replace(/\/$/, "")}${UPSTREAM_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!upstream.ok) {
      /*
        Logged with the status and body so a 400 from a contract change is
        diagnosable; NOT returned to the browser, which would leak upstream
        detail to an unauthenticated caller. The upstream returns its own
        per-field errors on a 400, and ours have already passed the same rules,
        so a 400 here means the contract moved — our problem, not the reader's.
      */
      const detail = await upstream.text().catch(() => "");
      console.error(`Contact message upstream failed: ${upstream.status} ${detail.slice(0, 500)}`);
      return NextResponse.json(
        { error: "upstream_error" },
        { status: upstream.status === 400 ? 400 : 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    console.error("Contact message could not be forwarded:", error);
    return NextResponse.json({ error: timedOut ? "timeout" : "unavailable" }, { status: 504 });
  } finally {
    clearTimeout(timeout);
  }
}
