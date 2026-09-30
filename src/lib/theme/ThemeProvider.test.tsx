import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { siteConfig } from '@/lib/content/site-config'
import { getTheme } from '@/themes'
import { ThemeProvider } from './ThemeProvider'

const STORAGE_KEY = 'mirai-launchpad:theme'

function renderSwitcher() {
  return render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>,
  )
}

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => {
  window.localStorage.clear()
})

describe('ThemeProvider (ST-031, ST-032)', () => {
  it('applies the configured default theme when nothing is stored', () => {
    renderSwitcher()
    const defaultTheme = getTheme(siteConfig.defaultTheme)
    expect(document.documentElement.dataset.theme).toBe(defaultTheme?.id)
    expect(document.documentElement.style.getPropertyValue('--background')).toBe(
      defaultTheme?.tokens.background,
    )
  })

  it('restores a previously persisted theme on mount', () => {
    window.localStorage.setItem(STORAGE_KEY, 'blue-professional')
    renderSwitcher()
    expect(document.documentElement.dataset.theme).toBe('blue-professional')
  })

  it('updates all CSS variables and persists on change, without a page reload', async () => {
    const user = userEvent.setup()
    renderSwitcher()

    const select = screen.getByLabelText('Choose theme')
    await act(async () => {
      await user.selectOptions(select, 'modern-minimal')
    })

    expect(document.documentElement.dataset.theme).toBe('modern-minimal')
    expect(document.documentElement.style.getPropertyValue('--background')).toBe('#FFFFFF')
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe('#FF4D4D')
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('modern-minimal')
  })
})

describe('ThemeSwitcher (ST-030, ST-033)', () => {
  it('renders a labeled, keyboard-operable dropdown listing every theme', () => {
    renderSwitcher()
    const select = screen.getByLabelText('Choose theme')
    expect(select.tagName).toBe('SELECT')
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })
})
