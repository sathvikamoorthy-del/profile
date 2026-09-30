/**
 * The theme token contract (ST-025). Every theme must supply every field —
 * this is what "one file per theme, no component changes" (ST-035) relies on.
 */
export interface ThemeTokens {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  border: string
  input: string
  ring: string
  /** CSS length, e.g. "0.5rem" — base corner radius the theme scales from. */
  radius: string
  /** CSS font-family value used for headings (h1-h6). */
  fontHeading: string
  /** CSS font-family value used for body text. */
  fontBody: string
}

export interface ThemeDefinition {
  id: string
  label: string
  tokens: ThemeTokens
}
