import Image from "next/image";

import { cn } from "@/lib/cn";

/*
  One image slot for post artwork, so the "photo not exported yet" state lives in
  exactly one place instead of every card.

  The web frames were captured on a bad connection and show these as empty framed
  boxes; the mobile frames show the real photographs. Rather than guess at
  artwork, a null `src` renders the same empty box the web frames draw — at the
  right aspect ratio, so the page's rhythm is already correct and dropping the
  real files in causes NO layout shift.

  See `src/content/posts.ts` for where the files go.
*/
type PostImageProps = {
  /** `/images/blog/<slug>.jpg`, or null while the export is outstanding. */
  src: string | null;
  /** Describes the photo. Ignored while `src` is null — the box is decorative. */
  alt: string;
  /** `sizes` for the responsive srcset; required whenever `src` is set. */
  sizes: string;
  className?: string;
  /** Above the fold — the featured post only. */
  priority?: boolean;
};

export function PostImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: PostImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-surface-subtle",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        // Decorative: the heading and excerpt beside it already carry the
        // meaning, so an empty box must not announce itself to a screen reader.
        <span aria-hidden="true" className="absolute inset-0 border border-border" />
      )}
    </div>
  );
}
