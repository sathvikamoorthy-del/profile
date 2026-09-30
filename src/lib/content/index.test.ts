import { describe, expect, it } from 'vitest'
import {
  awards,
  blogPosts,
  certifications,
  education,
  experience,
  gallery,
  hobbies,
  personal,
  projects,
  siteConfig,
  skills,
  socials,
  testimonials,
} from './index'

describe('content loaders (ST-023)', () => {
  it('loads and validates every placeholder data file without throwing', () => {
    expect(siteConfig.siteTitle).toBeTruthy()
    expect(personal.name).toBeTruthy()
    expect(experience.length).toBeGreaterThan(0)
    expect(education.length).toBeGreaterThan(0)
    expect(skills.length).toBeGreaterThan(0)
    expect(certifications.length).toBeGreaterThan(0)
    expect(awards.length).toBeGreaterThan(0)
    expect(projects.length).toBeGreaterThan(0)
    expect(hobbies.length).toBeGreaterThan(0)
    expect(testimonials.length).toBeGreaterThan(0)
    expect(socials.length).toBeGreaterThan(0)
    expect(gallery.length).toBeGreaterThan(0)
    expect(blogPosts.length).toBe(2)
  })

  it('sorts featured projects first (ST-052)', () => {
    expect(projects[0].featured).toBe(true)
  })

  it('sorts blog posts newest first (ST-054)', () => {
    expect(new Date(blogPosts[0].date).getTime()).toBeGreaterThanOrEqual(
      new Date(blogPosts[1].date).getTime(),
    )
  })
})
