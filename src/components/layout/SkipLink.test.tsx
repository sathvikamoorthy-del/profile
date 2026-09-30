import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SkipLink } from './SkipLink'

describe('SkipLink (ST-040)', () => {
  it('links to the main content landmark', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#main-content',
    )
  })
})
