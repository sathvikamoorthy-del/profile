/**
 * Skip-to-content link (ST-040) — visually hidden until focused, so
 * keyboard users can jump past the header/nav straight to <main>.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-ring"
    >
      Skip to content
    </a>
  )
}
