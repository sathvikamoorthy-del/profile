import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { personal } from '@/lib/content/personal'
import { experience } from '@/lib/content/experience'
import { ResumePage } from './ResumePage'

describe('ResumePage (ST-043-049)', () => {
  it('renders contact info, summary, and experience entries', () => {
    render(<ResumePage />)

    expect(screen.getByRole('heading', { name: personal.name, level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: personal.email })).toHaveAttribute(
      'href',
      `mailto:${personal.email}`,
    )
    const experienceHeadings = screen
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent)
    for (const entry of experience) {
      expect(experienceHeadings.some((text) => text?.includes(entry.company))).toBe(true)
    }
  })

  it('hides the Download PDF button entirely when resumePdfUrl is unset (ST-049)', () => {
    render(<ResumePage />)
    expect(personal.resumePdfUrl).toBeUndefined()
    expect(screen.queryByRole('link', { name: /download pdf/i })).not.toBeInTheDocument()
  })
})
