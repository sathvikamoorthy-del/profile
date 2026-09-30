import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { projects } from '@/lib/content/projects'
import { ProjectDetailPage } from './ProjectDetailPage'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProjectDetailPage (ST-050)', () => {
  it('renders the matching project', () => {
    const project = projects[0]
    renderAt(`/projects/${encodeURIComponent(project.id)}`)
    expect(screen.getByRole('heading', { name: project.title, level: 1 })).toBeInTheDocument()
  })

  it('shows a not-found state for an unknown id', () => {
    renderAt('/projects/does-not-exist')
    expect(screen.getByText('Project not found')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to projects' })).toHaveAttribute(
      'href',
      '/projects',
    )
  })
})
