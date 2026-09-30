import { describe, expect, it } from 'vitest'
import { getTheme, isValidThemeId, themeList, themes } from './index'

describe('theme registry (ST-025, ST-035)', () => {
  it('ships exactly the 4 required themes', () => {
    expect(Object.keys(themes).sort()).toEqual(
      ['blue-professional', 'dark-tech', 'modern-minimal', 'vibrant-creative'].sort(),
    )
  })

  it('every theme supplies every token in the contract', () => {
    const expectedKeys = [
      'background',
      'foreground',
      'card',
      'cardForeground',
      'popover',
      'popoverForeground',
      'primary',
      'primaryForeground',
      'secondary',
      'secondaryForeground',
      'muted',
      'mutedForeground',
      'accent',
      'accentForeground',
      'destructive',
      'border',
      'input',
      'ring',
      'radius',
      'fontHeading',
      'fontBody',
    ].sort()

    for (const theme of themeList) {
      expect(Object.keys(theme.tokens).sort()).toEqual(expectedKeys)
    }
  })

  it('validates known and unknown theme ids', () => {
    expect(isValidThemeId('dark-tech')).toBe(true)
    expect(isValidThemeId('not-a-real-theme')).toBe(false)
  })

  it('looks themes up by id', () => {
    expect(getTheme('modern-minimal')?.label).toBe('Modern Minimal')
    expect(getTheme('not-a-real-theme')).toBeUndefined()
  })
})
