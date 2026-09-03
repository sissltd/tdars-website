"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";
import { MoonIcon, SunIcon } from "@/components/site/icons";

/**
 * Light/dark toggle, matched to the application's own control so the two
 * products behave the same way: moon while light is active, sun while dark is.
 *
 * The `mounted` guard is not defensive padding. The server has no idea which
 * theme the visitor chose — that lives in localStorage and is applied by
 * next-themes' inline script before paint. Rendering the resolved icon during
 * SSR would therefore hydrate with the wrong glyph on every dark-mode visit, so
 * the moon is held until the client knows.
 *
 * `useSyncExternalStore` rather than the usual `useEffect(() => setMounted(true))`:
 * it returns the server snapshot (false) during SSR and the client snapshot
 * (true) after hydration, which is exactly the question being asked — and it
 * does it without a state write inside an effect, which this project's lint
 * rules reject as a cascading render.
 */
const subscribe = () => () => {};
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-body transition-colors hover:bg-surface-subtle hover:text-heading",
        className,
      )}
    >
      {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  );
}
