import type { ThemeDefinition } from './types'

/**
 * Dark Tech (ST-027) — near-black background, neon glow accent, subtle
 * cyberpunk/synthwave edge. The default theme on first visit (ST-032).
 */
export const darkTech: ThemeDefinition = {
  id: 'dark-tech',
  label: 'Dark Tech',
  tokens: {
    background: '#0B0B0F',
    foreground: '#F5F5F5',
    card: '#14141B',
    cardForeground: '#F5F5F5',
    popover: '#14141B',
    popoverForeground: '#F5F5F5',
    primary: '#39FF88',
    primaryForeground: '#0B0B0F',
    secondary: '#1E1E27',
    secondaryForeground: '#F5F5F5',
    muted: '#1E1E27',
    mutedForeground: '#A1A1AA',
    accent: '#39FF88',
    accentForeground: '#0B0B0F',
    destructive: '#FF5C5C',
    border: '#2A2A35',
    input: '#2A2A35',
    ring: '#39FF88',
    radius: '0.375rem',
    fontHeading: "'JetBrains Mono', ui-monospace, monospace",
    fontBody: "'Space Grotesk', system-ui, sans-serif",
  },
}
