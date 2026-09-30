import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { projects } from '@/lib/content/projects'
import { ProjectsPage } from './ProjectsPage'

describe('ProjectsPage (ST-050)', () => {
  it('renders every project', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    )

    for (const project of projects) {
      expect(screen.getByRole('link', { name: project.title })).toBeInTheDocument()
    }
  })
})
