import { describe, expect, it } from 'vitest'
import type { ThemeTokens } from '@/themes/types'
import { applyTheme } from './apply-theme'

// A fabricated 5th theme, deliberately not registered in src/themes/index.ts.
// Proves the token-application mechanism works for *any* theme conforming
// to the contract, not just the 4 shipped ones (ST-035's extensibility
// requirement) — the missing piece is a config file, never component code.
const hypotheticalFifthTheme: ThemeTokens = {
  background: '#010203',
  foreground: '#fefdfc',
  card: '#111213',
  cardForeground: '#fefdfc',
  popover: '#111213',
  popoverForeground: '#fefdfc',
  primary: '#abcdef',
  primaryForeground: '#010203',
  secondary: '#222324',
  secondaryForeground: '#fefdfc',
  muted: '#222324',
  mutedForeground: '#9a9b9c',
  accent: '#fedcba',
  accentForeground: '#010203',
  destructive: '#ff0000',
  border: '#333435',
  input: '#333435',
  ring: '#abcdef',
  radius: '2rem',
  fontHeading: "'Comic Sans MS', cursive",
  fontBody: "'Comic Sans MS', cursive",
}

describe('applyTheme (ST-031, ST-035)', () => {
  it('sets every token as a CSS custom property on the target element', () => {
    const root = document.createElement('div')
    applyTheme(hypotheticalFifthTheme, root)

    expect(root.style.getPropertyValue('--background')).toBe('#010203')
    expect(root.style.getPropertyValue('--foreground')).toBe('#fefdfc')
    expect(root.style.getPropertyValue('--primary')).toBe('#abcdef')
    expect(root.style.getPropertyValue('--radius')).toBe('2rem')
    expect(root.style.getPropertyValue('--font-heading')).toBe("'Comic Sans MS', cursive")
    expect(root.style.getPropertyValue('--font-sans')).toBe("'Comic Sans MS', cursive")
  })
})
