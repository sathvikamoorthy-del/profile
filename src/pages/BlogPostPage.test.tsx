import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { blogPosts } from '@/lib/content/blog'
import { BlogPostPage } from './BlogPostPage'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('BlogPostPage (ST-055)', () => {
  it('renders the matching post title and body', () => {
    const post = blogPosts[0]
    renderAt(`/blog/${post.slug}`)
    expect(screen.getByRole('heading', { name: post.title, level: 1 })).toBeInTheDocument()
  })

  it('shows a not-found state for an unknown slug', () => {
    renderAt('/blog/does-not-exist')
    expect(screen.getByText('Post not found')).toBeInTheDocument()
  })
})
