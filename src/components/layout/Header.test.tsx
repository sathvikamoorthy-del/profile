import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { siteConfig } from '@/lib/content/site-config'
import { getPrimaryNavItems } from '@/lib/navigation'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'
import { Header } from './Header'

function renderHeader() {
  return render(
    <ThemeProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe('Header (ST-036, ST-037)', () => {
  it('renders the site title as a wordmark and every enabled nav item', () => {
    renderHeader()

    expect(screen.getByText(siteConfig.siteTitle)).toBeInTheDocument()
    for (const item of getPrimaryNavItems()) {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
    }
  })

  it('shows the Customize link when showCustomizeGuide is true', () => {
    renderHeader()

    if (siteConfig.showCustomizeGuide) {
      expect(screen.getByRole('link', { name: 'Customize' })).toBeInTheDocument()
    }
  })
})
