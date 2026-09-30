import type { ThemeDefinition } from './types'

/**
 * Blue Professional (ST-029) — the deliberate non-Gen-Z exception: light,
 * corporate-safe navy/blue palette, conservative type, minimal motion.
 * Accent is a touch darker than the originally drafted #2D7DD2 so white
 * text on it clears WCAG AA for normal-size text (ST-034), not just large.
 */
export const blueProfessional: ThemeDefinition = {
  id: 'blue-professional',
  label: 'Blue Professional',
  tokens: {
    background: '#FFFFFF',
    foreground: '#0B2545',
    card: '#F7F9FC',
    cardForeground: '#0B2545',
    popover: '#FFFFFF',
    popoverForeground: '#0B2545',
    primary: '#0B2545',
    primaryForeground: '#FFFFFF',
    secondary: '#E7EEF6',
    secondaryForeground: '#0B2545',
    muted: '#E7EEF6',
    mutedForeground: '#4A5A72',
    accent: '#256DBF',
    accentForeground: '#FFFFFF',
    destructive: '#C4362B',
    border: '#D7E1EC',
    input: '#D7E1EC',
    ring: '#256DBF',
    radius: '0.375rem',
    fontHeading: "'Source Sans 3', system-ui, sans-serif",
    fontBody: "'Source Sans 3', system-ui, sans-serif",
  },
}
