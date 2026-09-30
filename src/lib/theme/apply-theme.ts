import type { ThemeTokens } from '@/themes/types'

const CSS_VAR_BY_TOKEN: Record<keyof ThemeTokens, string> = {
  background: '--background',
  foreground: '--foreground',
  card: '--card',
  cardForeground: '--card-foreground',
  popover: '--popover',
  popoverForeground: '--popover-foreground',
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  secondaryForeground: '--secondary-foreground',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  accent: '--accent',
  accentForeground: '--accent-foreground',
  destructive: '--destructive',
  border: '--border',
  input: '--input',
  ring: '--ring',
  radius: '--radius',
  fontHeading: '--font-heading',
  fontBody: '--font-sans',
}

/** Sets every theme token as a CSS custom property on `root` (ST-031). */
export function applyTheme(tokens: ThemeTokens, root: HTMLElement = document.documentElement) {
  for (const key of Object.keys(CSS_VAR_BY_TOKEN) as (keyof ThemeTokens)[]) {
    root.style.setProperty(CSS_VAR_BY_TOKEN[key], tokens[key])
  }
}
