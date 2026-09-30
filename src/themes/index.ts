import { modernMinimal } from './modern-minimal'
import { darkTech } from './dark-tech'
import { vibrantCreative } from './vibrant-creative'
import { blueProfessional } from './blue-professional'
import type { ThemeDefinition } from './types'

export type { ThemeDefinition, ThemeTokens } from './types'

/**
 * The full theme registry (ST-035). To add a 5th theme: create a file next
 * to these exporting a `ThemeDefinition`, add it here, and reference its id
 * in `site.config.json.availableThemes` — no other component code changes.
 */
export const themes = {
  'modern-minimal': modernMinimal,
  'dark-tech': darkTech,
  'vibrant-creative': vibrantCreative,
  'blue-professional': blueProfessional,
} satisfies Record<string, ThemeDefinition>

export type ThemeId = keyof typeof themes

export const themeList: ThemeDefinition[] = Object.values(themes)

export function getTheme(id: string): ThemeDefinition | undefined {
  return (themes as Record<string, ThemeDefinition>)[id]
}

export function isValidThemeId(id: string): id is ThemeId {
  return id in themes
}
