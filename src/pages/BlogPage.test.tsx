import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { blogPosts } from '@/lib/content/blog'
import { BlogPage } from './BlogPage'

describe('BlogPage (ST-054)', () => {
  it('renders every post, linking to its detail page', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>,
    )

    for (const post of blogPosts) {
      expect(screen.getByRole('link', { name: post.title })).toHaveAttribute(
        'href',
        `/blog/${post.slug}`,
      )
    }
  })
})
