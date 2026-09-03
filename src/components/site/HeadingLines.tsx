import { Fragment } from "react";

import { cn } from "@/lib/cn";

/**
 * A heading broken where the FRAME breaks it, not where the text happens to wrap.
 *
 * Several of Yemi's headings fill their 720px column almost exactly — close
 * enough that the browser's font metrics push the last word onto a line of its
 * own and the intended break never happens. Splitting the string is not enough
 * on its own: line one has to be `whitespace-nowrap` or it splits first.
 *
 * Both only hold at `site:` (1440), the width the frame was measured at. Below
 * it the column is narrower than the frame and the heading must wrap freely —
 * a `nowrap` line at the `lg` breakpoint, where a two-column split is only
 * ~368px wide, would overflow the page horizontally.
 *
 * Pass the lines exactly as the frame breaks them.
 */
export function HeadingLines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          <span
            className={cn(
              "site:block",
              // Every line but the last has to hold together; the last one has
              // nothing after it to push down.
              index < lines.length - 1 && "site:whitespace-nowrap",
            )}
          >
            {index > 0 ? " " : ""}
            {line}
          </span>
        </Fragment>
      ))}
    </>
  );
}
