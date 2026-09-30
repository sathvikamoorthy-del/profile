import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { personal } from '@/lib/content/personal'
import { socials } from '@/lib/content/socials'
import { Footer } from './Footer'

describe('Footer (ST-039)', () => {
  it('renders a footer landmark with every social link and a copyright line', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()

    for (const social of socials) {
      expect(screen.getByRole('link', { name: social.platform })).toHaveAttribute(
        'href',
        social.url,
      )
    }

    expect(screen.getByText(new RegExp(personal.name))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument()
  })
})
