import { describe, expect, it } from 'vitest'
import { getPrimaryNavItems, CUSTOMIZE_NAV_ITEM } from './navigation'
import { siteConfig } from './content/site-config'

describe('getPrimaryNavItems (ST-037)', () => {
  it('returns only enabled items, sorted by order, with resolved routes', () => {
    const items = getPrimaryNavItems()
    const enabledIds = siteConfig.navigation
      .filter((item) => item.enabled)
      .sort((a, b) => a.order - b.order)
      .map((item) => item.id)

    expect(items.map((item) => item.id)).toEqual(enabledIds)
    expect(items.find((item) => item.id === 'home')?.path).toBe('/')
    expect(items.find((item) => item.id === 'resume')?.path).toBe('/resume')
  })
})

describe('CUSTOMIZE_NAV_ITEM (Epic 12)', () => {
  it('points at /customize', () => {
    expect(CUSTOMIZE_NAV_ITEM.path).toBe('/customize')
  })
})
