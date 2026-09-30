import { useLayoutEffect, useState, type ReactNode } from 'react'
import { siteConfig } from '@/lib/content/site-config'
import { getTheme, isValidThemeId, themeList, type ThemeId } from '@/themes'
import { applyTheme } from './apply-theme'
import { ThemeContext } from './theme-context'

const THEME_STORAGE_KEY = 'mirai-launchpad:theme'

function readStoredThemeId(): string | null {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStoredThemeId(id: string) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id)
  } catch {
    // localStorage unavailable (e.g. private browsing quota) — theme still
    // applies for this session, it just won't persist across visits.
  }
}

function resolveInitialThemeId(): ThemeId {
  const stored = readStoredThemeId()
  if (stored && isValidThemeId(stored)) return stored
  if (isValidThemeId(siteConfig.defaultTheme)) return siteConfig.defaultTheme
  return themeList[0].id as ThemeId
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(resolveInitialThemeId)

  // useLayoutEffect (not useEffect) so the theme is applied before the
  // browser paints, avoiding a flash of the wrong theme (ST-031).
  useLayoutEffect(() => {
    const theme = getTheme(themeId) ?? themeList[0]
    applyTheme(theme.tokens)
    document.documentElement.dataset.theme = theme.id
    writeStoredThemeId(theme.id)
  }, [themeId])

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, themes: themeList }}>
      {children}
    </ThemeContext.Provider>
  )
}
