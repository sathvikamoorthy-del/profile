import { createContext, useContext } from 'react'
import type { ThemeDefinition, ThemeId } from '@/themes'

export interface ThemeContextValue {
  themeId: ThemeId
  setThemeId: (id: ThemeId) => void
  themes: ThemeDefinition[]
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
