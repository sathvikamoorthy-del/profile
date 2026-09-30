import { BookOpen, Code2, Globe, Link, Mountain, Puzzle } from 'lucide-react'
import type { LucideIcon, LucideProps } from 'lucide-react'

/**
 * Icons referenced by name from content JSON (socials.json.icon,
 * hobbies.json.icon — see epic-02-data-layer.md). A small explicit map of
 * statically-imported icons, not a lookup into the full lucide-react icon
 * set: importing lucide's `icons` object ballooned the bundle from ~500KB
 * to ~1.1MB, and its `dynamic` per-icon-chunk entry point split the build
 * into 1000+ tiny chunk files. For a template shipping a handful of curated
 * icons, adding one import line here when you introduce a new icon name is
 * the better tradeoff — documented in the Maintainer Guide (Epic 10).
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  Code2,
  BookOpen,
  Mountain,
  Puzzle,
}

/** Resolves an icon by name, falling back to a generic link icon. */
export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICON_MAP[name] ?? Link
  return <Icon {...props} />
}
