import { describe, expect, it } from 'vitest'
import { getRouterBasename, withBase } from './base-path'

describe('withBase (ST-064)', () => {
  it('prefixes an absolute-looking path with the configured base', () => {
    // vite.config.ts sets `base` from site.config.json.basePath, so this
    // exercises the real configured value, not a stubbed one.
    expect(withBase('/images/avatar.svg')).toBe(`${import.meta.env.BASE_URL}images/avatar.svg`)
  })

  it('prefixes a relative path the same way', () => {
    expect(withBase('images/avatar.svg')).toBe(`${import.meta.env.BASE_URL}images/avatar.svg`)
  })

  it('leaves external URLs unchanged', () => {
    expect(withBase('https://example.com/avatar.png')).toBe('https://example.com/avatar.png')
    expect(withBase('http://example.com/avatar.png')).toBe('http://example.com/avatar.png')
  })
})

describe('getRouterBasename (ST-061)', () => {
  it('strips a trailing slash for a project-page basePath', () => {
    expect(getRouterBasename('/mirai-launchpad/')).toBe('/mirai-launchpad')
  })

  it('returns undefined for a root basePath', () => {
    expect(getRouterBasename('/')).toBeUndefined()
  })

  it('leaves a basePath with no trailing slash unchanged', () => {
    expect(getRouterBasename('/mirai-launchpad')).toBe('/mirai-launchpad')
  })
})
