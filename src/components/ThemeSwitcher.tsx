import { useId } from 'react'
import { useTheme } from '@/lib/theme/theme-context'
import type { ThemeId } from '@/themes'
import { isValidThemeId } from '@/themes'

/**
 * Theme switcher (ST-030): a dropdown/select menu. A native <select> is used
 * deliberately — it's keyboard-operable and screen-reader-labeled by default
 * (ST-033), with no extra ARIA wiring needed to get that right.
 */
export function ThemeSwitcher() {
  const { themeId, setThemeId, themes } = useTheme()
  const labelId = useId()

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    if (isValidThemeId(value)) {
      setThemeId(value as ThemeId)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={labelId} className="sr-only">
        Choose theme
      </label>
      <select
        id={labelId}
        value={themeId}
        onChange={handleChange}
        className="rounded-[var(--radius)] border border-border bg-background px-3 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  )
}
