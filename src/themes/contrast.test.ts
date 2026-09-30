import { describe, expect, it } from 'vitest'
import { themeList } from './index'
import type { ThemeTokens } from './types'

// Minimal color parsing: supports #rrggbb and rgba(r, g, b, a). Good enough
// for the token values this project's theme files actually use.
function parseColor(color: string): [number, number, number, number] {
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const bigint = parseInt(hex, 16)
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255, 1]
  }

  const match = color.match(/rgba?\(([^)]+)\)/)
  if (match) {
    const [r, g, b, a = 1] = match[1].split(',').map((part) => parseFloat(part.trim()))
    return [r, g, b, a]
  }

  throw new Error(`Unsupported color format in contrast test: ${color}`)
}

// Composites a (possibly translucent) foreground color over an opaque
// background — needed for Vibrant Creative's glassmorphism tokens, which
// are rgba() values by design (ST-028).
function resolveOpaqueColor(color: string, backgroundHex: string): [number, number, number] {
  const [r, g, b, a] = parseColor(color)
  if (a >= 1) return [r, g, b]
  const [br, bg, bb] = parseColor(backgroundHex)
  return [r * a + br * (1 - a), g * a + bg * (1 - a), b * a + bb * (1 - a)]
}

function luminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const cs = c / 255
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function contrastRatio(fg: string, bg: string, backdropHex: string): number {
  const l1 = luminance(resolveOpaqueColor(fg, backdropHex))
  const l2 = luminance(resolveOpaqueColor(bg, backdropHex))
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (lighter + 0.05) / (darker + 0.05)
}

const AA_NORMAL_TEXT = 4.5

const pairs: [keyof ThemeTokens, keyof ThemeTokens][] = [
  ['foreground', 'background'],
  ['cardForeground', 'card'],
  ['popoverForeground', 'popover'],
  ['primaryForeground', 'primary'],
  ['secondaryForeground', 'secondary'],
  ['mutedForeground', 'muted'],
  ['accentForeground', 'accent'],
]

describe('theme WCAG AA contrast (ST-034)', () => {
  for (const theme of themeList) {
    describe(theme.label, () => {
      for (const [fgKey, bgKey] of pairs) {
        it(`${fgKey} on ${bgKey} meets 4.5:1`, () => {
          const ratio = contrastRatio(
            theme.tokens[fgKey],
            theme.tokens[bgKey],
            theme.tokens.background,
          )
          expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT)
        })
      }
    })
  }
})
