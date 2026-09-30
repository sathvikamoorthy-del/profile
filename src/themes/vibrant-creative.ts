import type { ThemeDefinition } from './types'

/**
 * Vibrant Creative (ST-028) — gradient mesh / glassmorphism aesthetic on a
 * deep purple base, with the purple/pink/orange palette carried into the
 * solid token values components actually render (buttons, text, borders).
 * The gradient mesh backdrop itself is a decorative layer added by section
 * components (Epic 5), not a token — `--gradient-mesh` isn't part of the
 * shared ThemeTokens contract because the other 3 themes have no equivalent.
 * This is also the one theme that gets extra motion (parallax, hover tilt,
 * floating shapes) — components should branch on `themeId === 'vibrant-creative'`
 * for that, since motion intensity isn't a CSS token either.
 */
export const vibrantCreative: ThemeDefinition = {
  id: 'vibrant-creative',
  label: 'Vibrant Creative',
  tokens: {
    background: '#170B26',
    foreground: '#FDF4FF',
    card: 'rgba(255, 255, 255, 0.08)',
    cardForeground: '#FDF4FF',
    popover: '#241335',
    popoverForeground: '#FDF4FF',
    primary: '#FF3EA5',
    primaryForeground: '#170B26',
    secondary: '#2E1650',
    secondaryForeground: '#FDF4FF',
    muted: '#20112E',
    mutedForeground: '#C9B8DE',
    accent: '#FF7A3D',
    accentForeground: '#170B26',
    destructive: '#FF4D6D',
    border: 'rgba(255, 255, 255, 0.15)',
    input: 'rgba(255, 255, 255, 0.12)',
    ring: '#FF3EA5',
    radius: '1.25rem',
    fontHeading: "'Sora', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
  },
}
