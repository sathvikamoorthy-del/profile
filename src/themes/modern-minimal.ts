import type { ThemeDefinition } from './types'

/**
 * Modern Minimal (ST-026) — light, bold oversized type, one loud accent,
 * chunky rounded shapes and thick borders (soft-brutalist, not sterile).
 */
export const modernMinimal: ThemeDefinition = {
  id: 'modern-minimal',
  label: 'Modern Minimal',
  tokens: {
    background: '#FFFFFF',
    foreground: '#111111',
    card: '#F7F7F5',
    cardForeground: '#111111',
    popover: '#FFFFFF',
    popoverForeground: '#111111',
    primary: '#111111',
    primaryForeground: '#FFFFFF',
    secondary: '#F0F0F0',
    secondaryForeground: '#111111',
    muted: '#F0F0F0',
    mutedForeground: '#4B4B4B',
    accent: '#FF4D4D',
    accentForeground: '#111111',
    destructive: '#D92D20',
    border: '#111111',
    input: '#111111',
    ring: '#FF4D4D',
    radius: '1rem',
    fontHeading: "'Space Grotesk', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
  },
}
