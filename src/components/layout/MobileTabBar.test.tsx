import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { getPrimaryNavItems } from '@/lib/navigation'
import { MobileTabBar } from './MobileTabBar'

describe('MobileTabBar (ST-038)', () => {
  it('renders a nav landmark with every enabled nav item', () => {
    render(
      <MemoryRouter>
        <MobileTabBar />
      </MemoryRouter>,
    )

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    for (const item of getPrimaryNavItems()) {
      expect(screen.getByRole('link', { name: new RegExp(item.label) })).toBeInTheDocument()
    }
  })
})
